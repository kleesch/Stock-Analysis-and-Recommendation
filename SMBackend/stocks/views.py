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
    
    # GET api/dailystocks/getByTicker?ticker=<string>
    # Gets all daily stock information for a provided ticker
    # Possible Reponses: 400 Bad Request, 200 OK, 204 No Content
    @action(methods=['get'], detail=False)
    def getByTicker(self, request):
        requested_ticker = request.query_params.get('ticker')
        if not requested_ticker:
            # User did not request a ticker in their request
            return Response(status=400, data="Missing Ticker")
        if not Stock.objects.filter(ticker=requested_ticker).exists():
            # Requested ticker does not exist in our records
            return Response(status=400, data="Invalid Ticker")
        info = DailyStockData.objects.all().filter(ticker=requested_ticker)
        if info.exists():
            # Return found info
            return Response(status=200, data=serializers.serialize('json', info), content_type="application/json")
        # No content found; default condition
        return Response(status=204)
