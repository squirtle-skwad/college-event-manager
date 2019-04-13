import requests
import json
import pandas as pd
from .models import *
from authapp.models import User
from authapp.choices import RECIPIENTS


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


def get_recipients(event_obj):
    departments = Department.objects.filter(event=event_obj)
    recipients = list()
    for d in departments:
        users = User.objects.filter(department=d.department)
        for u in users:
            recipients.append(u.email)
    recipients = recipients + RECIPIENTS
    return recipients


def get_dates(event_obj):
    dates = list(Dates.objects.filter(event=event_obj))
    start_date = str(dates[0].start)
    start_date = start_date[0:10]
    return start_date
