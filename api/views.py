from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import KPIModelSerializer
from rest_framework import status
from kpi.models import KPIModel

class KPIModelView(APIView):
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
