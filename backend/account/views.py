from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import generics, status, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import MyUser
from . import serializers
from . import permissions


class RegisterView(generics.CreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = serializers.UserCreateSerializer


class LoginView(generics.GenericAPIView):
    queryset = MyUser.objects.all()
    serializer_class = serializers.UserSerializer

    def post(self, request, *args, **kwargs):
        ser = serializers.UserSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        try:
            user = get_user_model().objects.get(
                username=ser.validated_data.get("username"),
            )

            if not user.check_password(ser.validated_data.get("password")):
                raise

        except Exception as e:
            return Response(
                {
                    "msg": "No active account found with the given credentials",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )
        else:
            token = user.generate_new_key()
            return Response(
                {
                    "token": str(token),
                    "username": user.username,
                },
                status=status.HTTP_200_OK,
            )


class Me(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return Response(
            {
                "username": request.user.username,
                "permissions": request.user.permissions.values_list("title", flat=True),
                "is_superuser": request.user.is_superuser,
            }
        )


class LogoutUser(views.APIView):
    permission_classes = [
        IsAuthenticated,
        permissions.IsAdminOrHasUserManagementPermission,
    ]

    def get(self, request, username, *args, **kwargs):
        user = get_object_or_404(MyUser, username=username)
        user.generate_new_key()
        return Response({"msg": "Logged out"})


class UsersList(generics.ListAPIView):
    permission_classes = [
        IsAuthenticated,
        permissions.IsAdminOrHasUserManagementPermission,
    ]

    queryset = MyUser.objects.all()
    serializer_class = serializers.GetUserSerializer
