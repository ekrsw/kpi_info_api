import datetime

from django.utils.dateparse import parse_datetime
from django.utils.timezone import make_aware
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.permissions import IsAuthenticated
from .serializers import KPIModelSerializer, OperatorSerializer
from rest_framework import status
from kpi.models import KPIModel, Operator

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

class OperatorDetailView(APIView):
    permission_classes = [HasAPIKey | IsAuthenticated]
    serializer_class = OperatorSerializer

    def get(self, requests, pk):
        operator = Operator.objects.get(pk=pk)
        serializer = self.serializer_class(operator)
        return Response(serializer.data, status=status.HTTP_200_OK)
