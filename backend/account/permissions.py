from rest_framework.permissions import BasePermission

class HasRole(BasePermission):
    allowed_roles=()

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and request.user.role in self.allowed_roles
        )

class IsEmployee(HasRole):
    allowed_roles=("Employee",)

class IsManager(HasRole):
    allowed_roles=("Manager",)

class IsDirector(HasRole):
    allowed_roles=("Director",)

class IsEmployeeOrManager(HasRole):
    allowed_roles=("Employee","Manager")

class IsStaff(HasRole):
    allowed_roles=("Employee","Manager","Director")