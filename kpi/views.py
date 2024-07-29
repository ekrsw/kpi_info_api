from django.shortcuts import render
from django.views.generic import TemplateView

class DashboardView(TemplateView):
    template_name = 'kpi/dashboard.html'

class DetailView(TemplateView):
    template_name = 'kpi/detail.html'