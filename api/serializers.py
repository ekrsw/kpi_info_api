from rest_framework import serializers
from kpi.models import KPIModel, Operator


class KPIModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = KPIModel
        fields = ['created_at', 'total_calls', 'ivr_interruptions', 'abandoned_during_operator', 
                    'abandoned_in_ivr', 'abandoned_calls', 'voicemails', 'responses', 
                    'response_rate', 'phone_inquiries', 'direct_handling', 
                    'direct_handling_rate', 'callback_count_0_to_20_min', 
                    'cumulative_callback_under_20_min', 'cumulative_callback_rate_under_20_min', 
                    'callback_count_20_to_30_min', 'cumulative_callback_under_30_min', 
                    'cumulative_callback_rate_under_30_min', 'callback_count_30_to_40_min', 
                    'cumulative_callback_under_40_min', 'cumulative_callback_rate_under_40_min', 
                    'callback_count_40_to_60_min', 'cumulative_callback_under_60_min', 
                    'cumulative_callback_rate_under_60_min', 'callback_count_over_60_min', 
                    'waiting_for_callback_over_20min', 'waiting_for_callback_over_30min', 
                    'waiting_for_callback_over_40min', 'waiting_for_callback_over_60min', 
                    'wfc_20min_list', 'wfc_30min_list', 'wfc_40min_list', 'wfc_60min_list']


class OperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operator
        fields = '__all__'