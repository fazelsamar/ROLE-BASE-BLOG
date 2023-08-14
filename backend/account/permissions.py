from rest_framework.permissions import BasePermission


class IsAdminOrHasUserManagementPermission(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (
                "user_management"
                in request.user.permissions.values_list("title", flat=True)
            )
            or request.user
            and request.user.is_authenticated
            and request.user.is_superuser
        )
