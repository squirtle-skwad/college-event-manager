from rest_framework import serializers
from datetime import datetime
from .models import Event, Report, Image, Department, Dates


class DepartmentSerializer(serializers.ModelSerializer):
    """ An event can be organised by multiple departments.
        Use this serializer to add departments to events. """

    class Meta:
        model = Department
        fields = "__all__"


class DateSerializer(serializers.ModelSerializer):
    """ An event can be held on multiple, non-contigious dates.
        Use this serializer to add departments to events. """

    class Meta:
        model = Dates
        fields = "__all__"

    def validate(self, data):
        event_check = data["event"]
        start = datetime.date(data["start"])
        end = datetime.date(data["end"])
        event = Event.objects.filter(
            dates__start__date__lte=start,
            dates__end__date__gte=end,
            venue=event_check.venue,
        )
        event_1 = Event.objects.filter(
            dates__start__date__gte=start,
            dates__end__date__lte=end,
            venue=event_check.venue,
        )
        if event.exists() or event_1.exists():
            raise serializers.ValidationError(
                "This location and timing is already occupied."
            )
        return data


class CalendarDateSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(read_only=True)
    title = serializers.CharField(read_only=True, source="event.name")
    allDay = serializers.BooleanField(read_only=True, default=True)

    class Meta:
        model = Dates
        fields = ["event", "title", "start", "end", "allDay"]


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        exclude = ["event"]


class EventSerializer(serializers.ModelSerializer):
    report = serializers.PrimaryKeyRelatedField(read_only=True)
    report_data = ReportSerializer(read_only=True, source="report")
    departments = DepartmentSerializer(read_only=True, many=True)
    dates = DateSerializer(read_only=True, many=True)
    creator = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Event
        fields = (
            "id",
            "name",
            "venue",
            "departments",
            "venue",
            "expert_name",
            "description",
            "organizer",
            "PO1",
            "PO2",
            "PO3",
            "PO4",
            "PO5",
            "PO6",
            "PO7",
            "PO8",
            "PO9",
            "PO10",
            "PO11",
            "PO12",
            "PSO1",
            "PSO2",
            "PSO3",
            "PSO4",
            "report",
            "report_data",
            "dates",
            "creator",
        )


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    report = serializers.PrimaryKeyRelatedField(queryset=Report.objects.all())

    class Meta:
        model = Image
        fields = "__all__"


class ReportWithEventSerializer(serializers.HyperlinkedModelSerializer):
    image = ImageSerializer(read_only=True, many=True)
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    event_data = EventSerializer(read_only=True, source="event")

    class Meta:
        model = Report
        fields = (
            "id",
            "event",
            "event_data",
            "number_of_participants",
            "after_event_description",
            "image",
            "attendance",
            "expert_resume",
            "feedback_url",
        )
