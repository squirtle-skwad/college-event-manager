from django.shortcuts import HttpResponse, get_object_or_404
from rest_framework import viewsets, status, serializers
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from datetime import datetime, timedelta

from authapp.models import User
from .email import send_mail
from .models import *
from .serializers import *
from .utility import get_date
from .permissions import IsOwnerOfEvent, IsOwnerOfReport

from .doc_gen import render_report, generate_month_csv


# <-- Viewsets -->

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportWithEventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOfEvent]


class ImageViewSet(viewsets.ModelViewSet):
    """ Adds Images to Report of an event. 
        PDF is generated only after we add an image.
        ! Deprecated in the next release.
    """
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOfReport]

    def perform_create(self, serializer):
        serializer.save()

        report_id = serializer.data["report"]
        report = Report.objects.get(pk=report_id)
        render_report(report)  # <-- LOGIC FOR RENDERING TEMPLATE HERE


class DepartmentViewSet(viewsets.ModelViewSet):
    """ An event can be organised by multiple departments.
        Use this endpoint to add departments to events. """
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOfEvent]


class DatesViewSet(viewsets.ModelViewSet):
    """ An event can be held on multiple, non-contigious dates.
        Use this endpoint to add departments to events. """
    queryset = Dates.objects.all()
    serializer_class = DateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOfEvent]

# <-- !ViewSets -->

# <--x-->
def multiple_thunk(serializer):
    """ Factory for taking an array of objects
        and deserialising them. """
    @api_view(["POST"])
    def api_func(request):
        ls = request.data
        for item in ls:
            obj = serializer(data=item)
            if obj.is_valid():
                obj.save()
            else:
                return HttpResponse(status=400)
        return HttpResponse("OK", status=200)
    return api_func


dates_multiple = multiple_thunk(DateSerializer)
depts_multiple = multiple_thunk(DepartmentSerializer)
# <--x-->

# <-- EventQueryEndpoints -->

class CalendarViewSet(viewsets.ReadOnlyModelViewSet):
    """ This serializer is used by React Big Calendar 
        to display data. The JSON is in a particular
        format. """
    queryset = Dates.objects.all()
    serializer_class = CalendarDateSerializer


@api_view(["GET"])
def event_list_by_month(request, month, year):
    """ List all events according to month and year """
    if request.method == "GET":
        dates = Dates.objects.filter(start__month=month, start__year=year)
        serializer = CalendarDateSerializer(dates, many=True)
        return Response(serializer.data)


@api_view(["GET"])
def event_list_by_date(request, date, month, year):
    """ List all Events according to date """
    if request.method == "GET":
        start_date_lim = datetime(year, month, date, 23, 59, 59)
        end_date_lim = datetime(year, month, date, 0, 0, 0)
        dates = Dates.objects.filter(
           start__lte=start_date_lim, end__gte=end_date_lim,
        )
        events = set(map(lambda d: d.event, dates))
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


@api_view(["GET"])
@login_required()
def get_event_list(request):
    """ For user """
    if request.method == "GET":
        user = User.objects.filter(id=request.user.id)
        event = Event.objects.filter(creator=user[0].id)
        serializer = EventSerializer(event, many=True)
        return Response(serializer.data)


# <-- !EventQueryEndpoints -->

@api_view(["GET"])
def month_report(request, month, year):
    """ List all events according to month and year """
    if request.method == "GET":
        filename, month_name = generate_month_csv(month, year)
        dataset = open(filename, "rb")
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
        dataset = open(filename, "rb")
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
        dataset = open(filename, "rb")
        response = HttpResponse(dataset, content_type="application/pdf")
        return response


@api_view(["GET"])
@login_required()
def send_pdf(request, pk):
    if request.method == "GET":
        report = Report.objects.get(id=pk)
        event_obj = report.event
        name = report.event.name
        date = get_date(event_obj)
        filename = "{}${}.pdf".format(name, date)
        response = HttpResponse(content_type="text/pdf")
        teacher_name = request.user.first_name + " " + request.user.last_name
        send_mail(filename, teacher_name, event_obj)
        return response

# <-- !PDF -->
