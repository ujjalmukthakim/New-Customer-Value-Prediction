from django.contrib import admin
from .models import User,Brance

# Register your models here.

@admin.register(Brance)
class BranceAdmin(admin.ModelAdmin):
    list_display=("name","address","is_active")
    list_filter=("is_active",)
    search_fields=("name",)

admin.site.register(User)