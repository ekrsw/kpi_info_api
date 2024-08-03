from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework.permissions import IsAuthenticated
from .serializers import KPIModelSerializer
from rest_framework import status
from kpi.models import KPIModel

class KPIModelView(APIView):
    permission_classes = [HasAPIKey | IsAuthenticated]
    serializer_class = KPIModelSerializer

    def get(self, request):
        kpi = KPIModel.objects.latest('created_at')
        serializer = self.serializer_class(kpi)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)
