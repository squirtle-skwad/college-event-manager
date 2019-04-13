from django.db import models
from django.contrib.auth.models import AbstractUser
from . import choices


class User(AbstractUser):
    department = models.CharField(
        max_length=6, choices=choices.DEPARTMENT, default="COMPS"
    )
