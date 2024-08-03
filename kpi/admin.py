from django.contrib import admin
from .models import KPIModel, Operator, CSCGroup

admin.site.register(KPIModel)
admin.site.register(Operator)
admin.site.register(CSCGroup)