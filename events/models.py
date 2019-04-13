from django.db import models
from authapp import choices, models as authmodels


class Event(models.Model):
    name = models.CharField(max_length=128)
    venue = models.CharField(max_length=256)
    expert_name = models.CharField(max_length=256, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    organizer = models.TextField(null=True, blank=True)
    creator = models.ForeignKey(authmodels.User, on_delete=models.CASCADE)
    PO1 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PO2 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PO3 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PO4 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PO5 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PO6 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PO7 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PO8 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PO9 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PO10 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PO11 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PO12 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PSO1 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PSO2 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PSO3 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")
    PSO4 = models.CharField(max_length=6, choices=choices.OPTIONS, default="0")

    def __str__(self):
        return "{} : {}".format(self.pk, self.name)


class Department(models.Model):
    event = models.ForeignKey(
        Event, related_name="departments", on_delete=models.CASCADE
    )
    department = models.CharField(
        max_length=6, choices=choices.DEPARTMENT, default="COMPS"
    )


class Dates(models.Model):
    event = models.ForeignKey(Event, related_name="dates", on_delete=models.CASCADE)
    start = models.DateTimeField()
    end = models.DateTimeField()
    allDay = models.BooleanField(default=False)


class Report(models.Model):
    event = models.OneToOneField(Event, related_name="report", on_delete=models.CASCADE)
    after_event_description = models.TextField(null=True, blank=True)
    number_of_participants = models.IntegerField()
    attendance = models.ImageField()
    expert_resume = models.FileField()
    feedback_url = models.URLField(blank=True)

    def __str__(self):
        return self.event.__str__()


class Image(models.Model):
    image = models.ImageField()
    report = models.ForeignKey(Report, related_name="image", on_delete=models.CASCADE)
