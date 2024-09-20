from django.urls import path
from .views import LatestDashboardView, LatestAPIDashboardView, OperatorsListView, OperatorDetailView, TestView, MonitorView

app_name = 'kpi'
urlpatterns = [
    path('test/', TestView.as_view(), name='test'),
    path('dashboard/', LatestDashboardView.as_view(), name='dashboard'),
    path('api_dashboard/', LatestAPIDashboardView.as_view(), name='api_dashboard'),
    path('monitor/', MonitorView.as_view(), name='monitor'),
    path('detail/', LatestDashboardView.as_view(), name='detail'),
    path('operators_list/', OperatorsListView.as_view(), name='operators_list'),
    path('operator_detail/<int:pk>/', OperatorDetailView.as_view(), name='operator_detail'),
]