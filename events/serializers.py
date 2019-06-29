from rest_framework import serializers
from datetime import datetime
from .models import Event, Report, Image, Department, Date


class DepartmentSerializer(serializers.ModelSerializer):
    """ An event can be organised by multiple departments.
        Use this serializer to add departments to events. """

    class Meta:
        model = Department
        exclude = ("event", )


class DateSerializer(serializers.ModelSerializer):
    """ An event can be held on multiple, non-contigious dates.
        Use this serializer to add departments to events. """

    class Meta:
        model = Date
        exclude = ("event", )

    # def validate(self, data):
    #     event_check = data["event"]
    #     start = datetime.date(data["start"])
    #     end = datetime.date(data["end"])
    #     event = Event.objects.filter(
    #         dates__start__date__lte=start,
    #         dates__end__date__gte=end,
    #         venue=event_check.venue,
    #     )
    #     event_1 = Event.objects.filter(
    #         dates__start__date__gte=start,
    #         dates__end__date__lte=end,
    #         venue=event_check.venue,
    #     )
    #     if event.exists() or event_1.exists():
    #         raise serializers.ValidationError(
    #             "This location and timing is already occupied."
    #         )
    #     return data


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        exclude = ["event"]


class EventSerializer(serializers.ModelSerializer):
    dates = DateSerializer(many=True, required=False)
    departments = DepartmentSerializer(many=True, required=False)

    class Meta:
        model = Event
        fields = '__all__'

    def create(self, validated_data):
        dates_data = validated_data.pop('dates')
        event = Event.objects.create(**validated_data)
        for date in dates_data:
            Date.objects.create(event=event, **date)
        return event

    def update(self, instance, validated_data):
        dates_data, depts_data = None, None
        if 'dates' in validated_data:
            dates_data = validated_data.pop('dates')
        if 'departments' in validated_data:
            depts_data = validated_data.pop('departments')

        instance = super().update(instance, validated_data)

        if dates_data is not None:
            instance.dates.all().delete()
            for date in dates_data:
                Date.objects.create(event=instance, **date)
        
        if depts_data is not None:
            instance.departments.all().delete()
            for dept in depts_data:
                Department.objects.create(event=instance, **dept)

        return instance


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    report = serializers.PrimaryKeyRelatedField(queryset=Report.objects.all())
    image = serializers.ImageField()

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
