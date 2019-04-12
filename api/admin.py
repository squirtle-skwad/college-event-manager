from django.contrib import admin
from .models import User, Event, Image, Report
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.admin import UserAdmin


class UserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User


class UserAdmin(UserAdmin):
    form = UserChangeForm

    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("department",)}),)


admin.site.register(User, UserAdmin)

admin.site.register(Event)
admin.site.register(Image)
admin.site.register(Report)
