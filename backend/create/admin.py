from django.contrib import admin

# Register your models here.
from .models import User, Category, Challenge, Goal, Badge

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Challenge)
admin.site.register(Goal)
admin.site.register(Badge)
