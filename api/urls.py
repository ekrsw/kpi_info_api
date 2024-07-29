from django.urls import path
from . import views

app_name = 'api'
urlpatterns = [
    path('kpi/', views.KPIModelView.as_view(), name='kpi'),
]