from django.urls import path
from . import views

app_name = 'api'
urlpatterns = [
    path('kpi/', views.KPIModelView.as_view(), name='kpi'),
    path('kpi/<str:date_str>/', views.KPIModelByLatestDateView.as_view(), name='kpi_by_latest_date'),
    path('operators_list/', views.OperatorsListView.as_view(), name='operators_list'),
    path('operator_detail/<int:pk>/', views.OperatorDetailView.as_view(), name='operator_detail'),
]