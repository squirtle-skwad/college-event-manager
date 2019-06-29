from datetime import datetime

from django.shortcuts import HttpResponse
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view
from rest_framework.response import Response

from authapp.models import User
from .email import send_mail
from .models import *
from .serializers import *
from .permissions import IsOwnerOfEvent, IsOwnerOfReport

from .doc_gen import render_report, generate_month_csv


# <-- !EventQueryEndpoints -->

@api_view(["GET"])
def month_report(request, month, year):
    """ List all events according to month and year """
    if request.method == "GET":
        filename, month_name = generate_month_csv(month, year)
        with open(filename, "rb") as dataset:
            response = HttpResponse(dataset, content_type="text/csv")
            response["Content-Disposition"] = 'attachment; filename="{}_Report.csv"'.format(
                month_name
            )
        return response

# <-- PDF -->

@api_view(["GET"])
def report_pdf_download(request, pk):
    """ Download PDF """
    if request.method == "GET":
        report = Report.objects.get(id=pk)
        event = report.event
        event_serializer = EventSerializer(event).data
        name = event_serializer["name"]
        date = event_serializer["dates"][0]["start"][0:10]
        response = HttpResponse(content_type="text/pdf")
        filename = "media/pdf/{}${}.pdf".format(name, date)
        download_name = "{}_Report.pdf".format(name)
        with open(filename, "rb") as dataset:
            response = HttpResponse(dataset, content_type="text/pdf")
            response["Content-Disposition"] = 'attachment; filename="{}"'.format(
                download_name
            )
        return response


@api_view(["GET"])
def report_pdf_preview(request, pk):
    """ Preview PDF """
    if request.method == "GET":
        report = Report.objects.get(id=pk)
        event = report.event
        event_serializer = EventSerializer(event).data
        name = event_serializer["name"]
        date = event_serializer["dates"][0]["start"][0:10]
        filename = "media/pdf/{}${}.pdf".format(name, date)
        with open(filename, "rb") as dataset:
            response = HttpResponse(dataset, content_type="application/pdf")
        return response


@api_view(["GET"])
@login_required()
def send_pdf(request, pk):
    if request.method == "GET":
        report = Report.objects.get(id=pk)
        event_obj = report.event
        name = report.event.name
        start_date = str(min(map(lambda e: e.start, event_obj.dates.all())))
        date = start_date[:10]
        filename = "{}${}.pdf".format(name, date)
        response = HttpResponse(content_type="text/pdf")
        teacher_name = request.user.first_name + " " + request.user.last_name
        send_mail(filename, teacher_name, event_obj)
        return response

# <-- !PDF -->
