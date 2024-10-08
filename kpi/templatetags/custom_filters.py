import math

from django import template

register = template.Library()

@register.filter(name='percentage')
def percentage(value):
    return f"{value * 100:.2f}"

@register.filter(name='percentage_m')
def percentage_m(value):
    return f"{value * 100:.1f}"

@register.simple_tag
def add_values(value1, value2, value3):
    return value1 + value2 + value3

@register.simple_tag
def buffer(r, n, c):
    """KPIを達成するためのBufferを計算
        
    args:
        r: KPIの目標値
        n: 現在の達成件数
        c: 分母"""
        
    # KPIを達成できている場合は単純計算、できていない場合少し複雑。
    if c == 0:
        return '-'
    elif n / c >= r:
        b = (n / r) - c
        return int(math.floor(b))
    else:
        b = (n - c * r) / (1 - r)
        return int(math.floor(b))

@register.simple_tag
def wfc(wfc_20, wfc_30, wfc_40, wfc_60):
    if wfc_20:
        wfc_20 = set(wfc_20.split(','))
    else:
        wfc_20 = set()
    if wfc_30:
        wfc_30 = set(wfc_30.split(','))
    else:
        wfc_30 = set()
    if wfc_40:
        wfc_40 = set(wfc_40.split(','))
    else:
        wfc_40 = set()
    if wfc_60:
        wfc_60 = set(wfc_60.split(','))
    else:
        wfc_60 = set()

    wfc_20 = wfc_20 - wfc_30
    wfc_30 = wfc_30 - wfc_40
    wfc_40 = wfc_40 - wfc_60

    context = {
        '60分': wfc_60,
        '40分': wfc_40,
        '30分': wfc_30,
        '20分': wfc_20
    }

    return context
