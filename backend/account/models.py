import binascii
import os

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser


class MyPermission(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.title


class MyUser(AbstractUser):
    token = models.CharField(max_length=40, unique=True, blank=True, null=True)
    permissions = models.ManyToManyField(
        MyPermission,
        blank=True,
    )

    def generate_new_key(self):
        key = binascii.hexlify(os.urandom(40)).decode()
        self.token = key
        self.save()
        return key
