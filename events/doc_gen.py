from django.template.loader import get_template
from django.http import HttpResponse
from django.conf import settings

from datetime import datetime, timedelta
from io import BytesIO
from urllib.request import urlopen
import os
import xhtml2pdf.pisa as pisa
import pandas as pd

from .serializers import ReportWithEventSerializer, EventSerializer
from .models import Event


def render_report(report) -> str:
    event = report.event
    serializer_context = {"request": None}
    report_json = ReportWithEventSerializer(report, context=serializer_context).data
    event_json = EventSerializer(event).data
    dates_len = len(event_json["dates"])
    filename = event_json["name"] + "$" + event_json["dates"][0]["start"][0:10]
    event_json["dates"] = {
        "start": event_json["dates"][0]["start"][0:10],
        "end": event_json["dates"][dates_len - 1]["end"][0:10],
    }
    for items in report_json["image"]:
        items["image"] = items["image"]
    report_json["attendance"] = report_json["attendance"]
    dept_list = []
    for items in event_json["departments"]:
        dept_list.append(items["department"])
    event_json["departments"] = dept_list
    report_json["event_data"]["organizer"] = (
        report_json["event_data"]["organizer"].split(",")
        or report_json["event_data"]["organizer"].split(", ")
        or report_json["event_data"]["organizer"].split("\r\n")
    )
    params = {"report_dict": report_json, "event_dict": event_json}
    return render_to_file(
        template_path="pdf.html", 
        params=params, 
        name=filename,
    )


def generate_month_csv(month, year) -> str:
    event = Event.objects.filter(dates__start__month=month, dates__start__year=year)
    serializer = EventSerializer(event, many=True)
    serializer = list(serializer.data)
    li = list()
    for item in serializer:
        if item["id"] in li:
            serializer.remove(item)
        else:
            li.append(item["id"])
            item["dates"] = {
                "start": item["dates"][0]["start"],
                "end": item["dates"][len(item["dates"]) - 1]["end"],
            }
            dept_list = []
            for dept in item["departments"]:
                dept = dept["department"]
                dept_list.append(dept)
            item["departments"] = dept_list
            item["start"] = item["dates"]["start"][0:10]
            item["end"] = item["dates"]["end"][0:10]
            item.pop("dates")
    month_name = month_dict[month]
    filename = "media/csv_month/{}.csv".format(month_name)
    start_date = datetime.strptime("2019-{}-01".format(month), "%Y-%m-%d")
    end_date = datetime.strptime("2019-{}-30".format(month), "%Y-%m-%d")
    dates = pd.date_range(start_date, end_date)
    zf = pd.DataFrame(index=dates)
    df = pd.DataFrame.from_dict(serializer)
    df.to_csv(filename)
    nf = pd.read_csv(
        filename, index_col="start", parse_dates=True, na_values=["nan", "NaN"]
    )
    nf = nf.drop(columns=[nf.columns[0], nf.columns[1]])
    zf = zf.join(nf, how="inner")
    zf.to_csv(filename)

    return filename, month_name


# --> Utility variables <--

month_dict = [
    "months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

# --> Utility functions <--

def link_callback(uri, rel) -> str:
    """ Convert HTML URIs to absolute system paths 
        so xhtml2pdf can access those resources. """
    
    # Someone said: use short names (old comment)
    # Vikrant says: wHy tHe fUck dId yOu uSe cAmel cAse??
    sUrl = settings.STATIC_URL
    sRoot = settings.STATIC_ROOT
    mUrl = settings.MEDIA_URL  # media/name.jpg
    mRoot = settings.MEDIA_ROOT

    # Convert URIs to absolute system paths
    if uri.startswith(mUrl):
        path = os.path.join(mRoot, uri.replace(mUrl, ""))
    elif uri.startswith(sUrl):
        path = os.path.join(sRoot, uri.replace(sUrl, ""))
    else:
        return uri  # handle absolute uri (ie: http://some.tld/foo.png)

    # make sure that file exists
    if not os.path.exists(path):
        raise Exception("media URI must start with %s or %s" % (sUrl, mUrl))
    return path


def render_to_file(template_path: str, params: dict, name: str):
    template = get_template(template_path)
    html = template.render(params)
    
    file_path = os.path.join("media/pdf", f"{name}.pdf")
    with open(file_path, "wb") as f:
        pisaStatus = pisa.CreatePDF(html, dest=f, link_callback=link_callback)
    return file_path
