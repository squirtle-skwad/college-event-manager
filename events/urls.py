"""Project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include

from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register("events", views.EventViewSet)
router.register("reports", views.ReportViewSet)
router.register("images", views.ImageViewSet)
router.register("departments", views.DepartmentViewSet)
router.register("dates", views.DatesViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("dates-multiple/", views.dates_multiple, name="dates_multiple"),
    path("depts-multiple/", views.depts_multiple, name="depts_multiple"),
    path(
        "month-report/<int:month>/<int:year>", views.month_report, name="month_report"
    ),
    path(
        "report_pdf_download/<int:pk>",
        views.report_pdf_download,
        name="report_pdf_donwload",
    ),
    path(
        "report_pdf_preview/<int:pk>",
        views.report_pdf_preview,
        name="report_pdf_preview",
    ),
    path("profile/event-list", views.get_event_list, name="event_list"),
    path("send-pdf/<int:pk>", views.send_pdf, name="send_pdf"),
    path("event-calendar/", views.event_list_calendar_all, name="date_request"),
    path("event-calendar/<str:date>", views.event_list_by_date, name="date_request"),
    path(
        "event-calendar/<int:month>/<int:year>",
        views.event_list_by_month,
        name="month_request",
    ),
]
