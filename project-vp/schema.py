import graphene
from graphene_django.types import DjangoObjectType, Field
from graphene_django.rest_framework.mutation import SerializerMutation

from events.models import Event, Department, Dates, Report, Image
from events.serializers import *


#############
# Important #
#############

class EventType(DjangoObjectType):
    class Meta:
        model = Event

class ReportType(DjangoObjectType):
    class Meta:
        model = Report

###############
# Other Types #
###############

class DateType(DjangoObjectType):
    all_day = Field(graphene.Boolean, default_value=True)

    class Meta:
        model = Dates

class DepartmentType(DjangoObjectType):
    class Meta:
        model = Department

class ImageType(DjangoObjectType):
    class Meta:
        model = Image

#########
# Query #
#########

class Query(graphene.ObjectType):
    all_events = graphene.List(EventType)
    event = graphene.Field(EventType, event_id=graphene.String())

    all_reports = graphene.List(ReportType)
    report = graphene.Field(ReportType, event_id=graphene.String())

    all_dates = graphene.List(DateType)
    date = graphene.Field(DateType, event_id=graphene.String())

    def resolve_all_events(self, info, **kwargs):
        return Event.objects.all()

    def resolve_event(self, info, event_id):
        return Event.objects.get(pk=event_id)

    def resolve_all_reports(self, info, **kwargs):
        return Report.objects.all()

    def resolve_report(self, info, event_id):
        return Report.objects.get(event=event_id)

    def resolve_all_dates(self, info, **kwargs):
        return Dates.objects.all()

    def resolve_date(self, info, event_id):
        return Dates.objects.get_all(event=event_id)


#############
# Mutations #
#############

# class Mutation(graphene.ObjectType): pass
    # mutate_event = EventMutation.Field()


##########
# Schema #
##########

schema = graphene.Schema(query=Query)
