from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.RegisterView.as_view()),
    path("login/", views.LoginView.as_view()),
    path("me/", views.Me.as_view()),
    path("users/", views.UsersList.as_view()),
    path("logout/<str:username>/", views.LogoutUser.as_view()),
]
