from django import template

register = template.Library()

@register.filter(name='percentage')
def percentage(value):
    return f"{value * 100:.2f}"

@register.simple_tag
def add_values(value1, value2, value3):
    return value1 + value2 + value3

