from django.template.loader import get_template
from django.http import HttpResponse
from django.conf import settings
from io import BytesIO
from urllib.request import urlopen
import os
import xhtml2pdf.pisa as pisa

from .serializers import ReportWithEventSerializer, EventSerializer


def render_report_using_serializers(report, request):
    event = report.event
    serializer_context = {"request": request}
    report_json = ReportWithEventSerializer(report, context=serializer_context).data
    event_json = EventSerializer(event).data
    dates_len = len(event_json["dates"])
    filename = event_json["name"] + "$" + event_json["dates"][0]["start"][0:10]
    event_json["dates"] = {
        "start": event_json["dates"][0]["start"][0:10],
        "end": event_json["dates"][dates_len - 1]["end"][0:10],
    }
    for items in report_json["image"]:
        items["image"] = items["image"][22::]
    report_json["attendance"] = report_json["attendance"][22::]
    dept_list = []
    for items in event_json["departments"]:
        dept_list.append(items["department"])
    event_json["departments"] = dept_list
    print(event_json["departments"])

    report_json["event_data"]["organizer"] = (
        report_json["event_data"]["organizer"].split(",")
        or report_json["event_data"]["organizer"].split(", ")
        or report_json["event_data"]["organizer"].split("\r\n")
    )
    # print(report_json["event_data"])
    print(report_json["feedback_url"])
    params = {"report_dict": report_json, "event_dict": event_json, "request": request}
    render_to_file("pdf.html", params, filename)


def link_callback(uri, rel):
    """
    Convert HTML URIs to absolute system paths so xhtml2pdf can access those
    resources
    """
    # use short variable names
    sUrl = settings.STATIC_URL
    sRoot = settings.STATIC_ROOT
    mUrl = settings.MEDIA_URL  # media/name.jpg
    mRoot = settings.MEDIA_ROOT

    # convert URIs to absolute system paths
    if uri.startswith(mUrl):
        path = os.path.join(mRoot, uri.replace(mUrl, ""))
    elif uri.startswith(sUrl):
        path = os.path.join(sRoot, uri.replace(sUrl, ""))
    else:
        return uri  # handle absolute uri (ie: http://some.tld/foo.png)

    # make sure that file exists
    if not os.path.isfile(path):
        raise Exception("media URI must start with %s or %s" % (sUrl, mUrl))
    return path


def render_to_file(path: str, params: dict, file):
    template = get_template(path)
    html = template.render(params)
    file_name = "{}.pdf".format(file)
    file_path = os.path.join("media/pdf", file_name)
    file_pdf = open(file_path, "wb")
    pisaStatus = pisa.CreatePDF(html, dest=file_pdf, link_callback=link_callback)
    file_pdf.close()
