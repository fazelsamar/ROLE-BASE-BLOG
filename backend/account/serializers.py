from django.contrib.auth.password_validation import validate_password
from django.db import IntegrityError, transaction
from django.core import exceptions as django_exceptions
from rest_framework import serializers
from rest_framework.settings import api_settings

from .models import MyUser


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = MyUser
        fields = ["username", "password"]

    def validate(self, attrs):
        user = MyUser(**attrs)
        password = attrs.get("password")

        try:
            validate_password(password, user)
        except django_exceptions.ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError(
                {"password": serializer_error[api_settings.NON_FIELD_ERRORS_KEY]}
            )

        return attrs

    def create(self, validated_data):
        try:
            user = self.perform_create(validated_data)
        except IntegrityError:
            self.fail("cannot_create_user")

        return user

    def perform_create(self, validated_data):
        with transaction.atomic():
            user = MyUser.objects.create_user(**validated_data)
        return user


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)


class GetUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    permissions = serializers.SerializerMethodField("get_permissions")

    class Meta:
        model = MyUser
        fields = ["username", "password", "permissions", "is_superuser"]
        read_only_fields = ["is_superuser", "password", "permissions"]

    def get_permissions(self, obj):
        return obj.permissions.values_list("title", flat=True)
