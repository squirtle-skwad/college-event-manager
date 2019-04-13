"""
    WORK IN PROGRESS ~ Vikrant
"""

from rest_framework import permissions

class IsOwnerOfReport(permissions.BasePermission):
    message = "You are not the owner of this event!"

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.event.creator == request.user
