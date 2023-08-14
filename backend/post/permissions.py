from rest_framework.permissions import BasePermission


class IsAdminOrHasCreatePostPermission(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (
                "create_post"
                in request.user.permissions.values_list("title", flat=True)
            )
            or request.user
            and request.user.is_authenticated
            and request.user.is_superuser
        )


class IsAdminOrHasDeletePostPermission(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (
                "delete_post"
                in request.user.permissions.values_list("title", flat=True)
            )
            or request.user
            and request.user.is_authenticated
            and request.user.is_superuser
        )


class IsAdminOrHasEditPostPermission(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (
                "edit_post" in request.user.permissions.values_list("title", flat=True)
            )
            or request.user
            and request.user.is_authenticated
            and request.user.is_superuser
        )


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


class IsAdminOrHasSiteSettingsPermission(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (
                "site_settings"
                in request.user.permissions.values_list("title", flat=True)
            )
            or request.user
            and request.user.is_authenticated
            and request.user.is_superuser
        )
