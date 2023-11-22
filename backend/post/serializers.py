from rest_framework import serializers
from . import models


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = [
            "id",
            "title",
            "description",
            "image",
            "file",
            "created_at",
            "updated_at",
        ]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ["text", "created_at", "updated_at"]
