from django.urls import path
from .views import DashboardView, DetailView

app_name = 'kpi'
urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('detail/', DetailView.as_view(), name='detail'),
]