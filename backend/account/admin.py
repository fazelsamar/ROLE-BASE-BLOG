from django.contrib import admin

from . import models

admin.site.register(models.MyPermission)


@admin.register(models.MyUser)
class UserAdmin(admin.ModelAdmin):
    fields = (
        "username",
        "permissions",
        "is_staff",
        "is_superuser",
    )
