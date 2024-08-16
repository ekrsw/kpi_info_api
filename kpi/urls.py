from django.urls import path
from .views import LatestDashboardView, OperatorsListView, OperatorDetailView, TestView

app_name = 'kpi'
urlpatterns = [
    path('test/', TestView.as_view(), name='test'),
    path('dashboard/', LatestDashboardView.as_view(), name='dashboard'),
    path('detail/', LatestDashboardView.as_view(), name='detail'),
    path('operators_list/', OperatorsListView.as_view(), name='operators_list'),
    path('operator_detail/<int:pk>/', OperatorDetailView.as_view(), name='operator_detail'),
]