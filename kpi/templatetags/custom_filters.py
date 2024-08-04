from django import template

register = template.Library()

@register.filter(name='percentage')
def percentage(value):
    return f"{value * 100:.2f}"
