"""
    This module contains permissions used by ViewSets in views.py
    This promotes DRY code, as we do not need to overwrite
    create() or perform_create() funcitons in most cases by
    using these permission classes.

    Author:
        Vikrant Gajria
"""

from rest_framework import permissions
from .models import Event, Report


class IsOwnerOfEvent(permissions.BasePermission):
    """ This permission class checks whether the user
        is owner of event which is getting called.
        However it depends on the fact that the
        request data has an "event" model field relation,
        such as ForeignKey or OneToOneField. """
    
    message = "You are not the owner of this event!"

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.data:
            event = Event.objects.get(pk=request.data["event"])
            if event:
                return event.creator == request.user

        return True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.event.creator == request.user


class IsOwnerOfReport(permissions.BasePermission):
    """ This permission class checks whether the user
        is owner of report which is getting called.
        However it depends on the fact that the
        request data has a "report" model field relation,
        such as ForeignKey or OneToOneField. 
        NOTE: May be deprecated if Image model is removed! """
    
    message = "You are not the owner of this report!"

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.data:
            report = Report.objects.get(pk=request.data["report"])
            if report:
                return report.event.creator == request.user

        return True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.report.event.creator == request.user
