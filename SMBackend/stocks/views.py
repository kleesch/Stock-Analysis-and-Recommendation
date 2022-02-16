from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core import serializers

from .models import Stock, DailyStockData
from .serializers import StockSerializer, DailyStockDataSerializer


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all().order_by('ticker')
    serializer_class = StockSerializer


class DailyStockDataViewSet(viewsets.ModelViewSet):
    queryset = DailyStockData.objects.all().order_by('date')
    serializer_class = DailyStockDataSerializer

    @action(methods=['post'], detail=False)
    def getByTicker(self, request):
        info = DailyStockData.objects.all().filter(ticker=request.data["ticker"])
        if info:
            return Response(status=200, data=serializers.serialize('json', info), content_type="application/json")
        return Response(status=204)