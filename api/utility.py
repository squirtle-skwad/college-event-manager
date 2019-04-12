import requests
import json
import pandas as pd
from .task import import_data
import json
from .choices import RECIPIENTS
from .models import *

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


def generate_csv(report_data, event_data):
    report_data["event_data"] = "Not required"
    df = pd.DataFrame.from_dict(report_data)
    pf = pd.DataFrame.from_dict([event_data])
    y = []
    for i in range(len(report_data["image"])):
        z = requests.get(report_data["image"][i])
        z = z.json()
        y.append(z["image"])
    df["image"][0] = y
    df["id"][0] = pf["id"][0]
    # pf = pf.drop(["id"], 1)
    df = df.drop(["event_data"], 1)
    df = df.drop(range(1, len(report_data["image"])))
    yf = pf.merge(df, how="outer")
    print(yf)
    yf.to_csv("media/csv/{}.csv".format(event_data["name"]))
    file = "media/csv/{}.csv".format(event_data["name"])
    import_data(file)


def get_recipients(event_obj):
    departments = Department.objects.filter(event=event_obj)
    recipients = ["vikrantgajria@gmail.com"]
    for department in departments:
        users = User.objects.filter(department=department.department)
        for user in users:
            recipients.append(user.email)
    recipients = recipients + RECIPIENTS
    return recipients


def get_dates(event_obj):
    dates = list(Dates.objects.filter(event=event_obj))

    start_date = str(dates[0].start)
    start_date = start_date[0:10]
    return start_date
