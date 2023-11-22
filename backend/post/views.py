from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, SAFE_METHODS

from . import models
from . import serializers
from . import permissions


class PostViewSet(ModelViewSet):
    queryset = models.Post.objects
    serializer_class = serializers.PostSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return (AllowAny(),)
        if self.request.method == "POST":
            return [permissions.IsAdminOrHasCreatePostPermission()]
        if self.request.method in ("PUT", "PATCH"):
            return [permissions.IsAdminOrHasEditPostPermission()]
        if self.request.method == "DELETE":
            return [permissions.IsAdminOrHasDeletePostPermission()]


class CommentViewSet(ModelViewSet):
    queryset = models.Comment.objects
    serializer_class = serializers.CommentSerializer
    permission_classes = [IsAuthenticated]
