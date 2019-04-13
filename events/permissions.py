from rest_framework import permissions
from .models import Event, Report


class IsOwnerOfEvent(permissions.BasePermission):
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
