from django.shortcuts import render
from django.views.generic import TemplateView, ListView, DetailView

from .models import KPIModel, Operator

class LatestDashboardView(TemplateView):
    template_name = 'kpi/dashboard.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['kpi_object'] = KPIModel.objects.latest('created_at')
        return context

class OperatorsListView(ListView):
    model = Operator
    template_name = 'kpi/operator/operators_list.html'
    context_object_name = 'operators'

class OperatorDetailView(DetailView):
    model = Operator
    template_name = 'kpi/operator/operator_detail.html'

class TestView(TemplateView):
    template_name = 'kpi/test.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['kpi_object'] = KPIModel.objects.latest('created_at')
        return context