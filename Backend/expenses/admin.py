from django.contrib import admin
from .models import Expense, AuditLog

admin.site.register(Expense)
admin.site.register(AuditLog)