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
from . import views

urlpatterns = [
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
    path("send-pdf/<int:pk>", views.send_pdf, name="send_pdf"),
]
