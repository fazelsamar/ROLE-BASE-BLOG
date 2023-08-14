from django.urls import path

from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register("posts", views.PostViewSet, basename="posts")

urlpatterns = router.urls
