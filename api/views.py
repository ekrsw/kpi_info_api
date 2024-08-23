import datetime
import logging

from django.utils.dateparse import parse_date, parse_datetime
from django.utils.decorators import method_decorator
from django.utils.timezone import make_aware
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.permissions import IsAuthenticated
from .serializers import KPIModelSerializer, OperatorSerializer
from rest_framework import status
from kpi.models import KPIModel, Operator


@method_decorator(csrf_exempt, name='dispatch')
class KPIModelView(APIView):
    permission_classes = [HasAPIKey | IsAuthenticated]
    serializer_class = KPIModelSerializer

    def parse_custom_datetime(self, datetime_str):
        try:
            # datetime_str = datetime_str.replace('-', ':', 2)
            return make_aware(datetime.datetime.strptime(datetime_str, '%Y%m%d%H%M%S'))
        except ValueError:
            return None

    def get(self, request):
        created_at = request.query_params.get('created_at')
        if created_at:
            created_at_date = self.parse_custom_datetime(created_at)
            if not created_at_date:
                return Response({'error': "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                kpi = KPIModel.objects.filter(created_at__lte=created_at_date).latest('created_at')
            except KPIModel.DoesNotExist:
                return Response({'error': "No KPIModel found for the given created_at"}, status=status.HTTP_404_NOT_FOUND)
        else:
            kpi = KPIModel.objects.latest('created_at')

        serializer = self.serializer_class(kpi)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)


@method_decorator(csrf_exempt, name='dispatch')
class KPIModelByLatestDateView(APIView):
    permission_classes = [HasAPIKey | IsAuthenticated]
    serializer_class = KPIModelSerializer
        
    def get(self, request, date_str):
        created_at_date = parse_date(date_str)
        if not created_at_date:
            return Response({'error': "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

        # 指定された日付の0時から24時までの範囲を設定
        start_datetime = datetime.datetime.combine(created_at_date, datetime.datetime.min.time())
        end_datetime = start_datetime + datetime.timedelta(days=1)

        # 30分間隔でデータをフィルタリング
        queryset = KPIModel.objects.filter(created_at__gte=start_datetime, created_at__lt=end_datetime)
        filtered_data = []
        current_time = start_datetime

        while current_time < end_datetime:
            data_point = queryset.filter(created_at__gte=current_time, created_at__lt=current_time + datetime.timedelta(minutes=30)).first()
            if data_point:
                filtered_data.append(data_point)
            current_time += datetime.timedelta(minutes=30)
        
        # シリアライズしてレスポンスを返す
        serializer = self.serializer_class(filtered_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name='dispatch')
class OperatorsListView(APIView):
    permission_classes = [HasAPIKey | IsAuthenticated]
    serializer_class = OperatorSerializer

    def get(self, requests):
        operators = Operator.objects.all()
        serializer = self.serializer_class(operators, many=True)
        return Response(self.serializer_class(operators, many=True).data, status=status.HTTP_200_OK)

    def post(self, requests):
        serializer = self.serializer_class(data=requests.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class OperatorDetailView(APIView):
    permission_classes = [HasAPIKey | IsAuthenticated]
    serializer_class = OperatorSerializer

    def get(self, requests, pk):
        operator = Operator.objects.get(pk=pk)
        serializer = self.serializer_class(operator)
        return Response(serializer.data, status=status.HTTP_200_OK)
