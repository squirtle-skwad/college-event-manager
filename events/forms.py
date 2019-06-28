from django.forms import ModelForm
from .models import Event, Report

class EventForm(ModelForm):
    class Meta:
        model = Event
        fields = '__all__'

class ReportForm(ModelForm):
    class Meta:
        model = Report
        fields = '__all__'
