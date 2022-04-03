from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core import serializers

import json

from .models import Stock, DailyStockData, WatchedStock, StockRecommendation
from .serializers import StockSerializer, DailyStockDataSerializer, WatchedStockSerializer, \
    StockRecommendationSerializer


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


class WatchedStockViewSet(viewsets.ModelViewSet):
    queryset = WatchedStock.objects.all().order_by('ticker')
    serializer_class = WatchedStockSerializer

    # GET api/dailystocks/getByUsername?username=<string>
    # Gets all watched stocks for a provided user
    # Possible Reponses: 400 Bad Request, 200 OK, 204 No Content
    @action(methods=['get'], detail=False)
    def getByUsername(self, request):
        requested_username = request.query_params.get('username')
        if not requested_username:
            # Username field empty
            return Response(status=400, data="Unspecified Username")
        if not WatchedStock.objects.filter(username=requested_username).exists():
            # Requested username does not exist in our records
            return Response(status=400, data="Invalid Username")
        info = WatchedStock.objects.all().filter(username=requested_username)
        if info.exists():
            # Return found info
            return Response(status=200, data=serializers.serialize('json', info), content_type="application/json")
        # No content found; default condition
        return Response(status=204)

    @action(methods=['get'], detail=False)
    def getByFrequency(self, request):
        watchedStockObjs = WatchedStock.objects.all()
        watchedStockFrequencies = {}
        for record in watchedStockObjs.iterator():
            if not (record.ticker in watchedStockFrequencies):
                watchedStockFrequencies[record.ticker] = 0
            watchedStockFrequencies[record.ticker] += 1
        return Response(status=200, data=json.dumps(watchedStockFrequencies))


class StockRecommendationkViewSet(viewsets.ModelViewSet):
    queryset = StockRecommendation.objects.all().order_by('ticker')
    serializer_class = StockRecommendationSerializer

    # GET api/recommendedstocks/getByTicker?ticker=<string>
    # Gets recommendation by ticker
    # Possible Reponses: 400 Bad Request, 200 OK, 204 No Content
    @action(methods=['get'], detail=False)
    def getByTicker(self, request):
        requested_ticker = request.query_params.get('ticker')
        if not requested_ticker:
            # Ticker field empty
            return Response(status=400, data="Unspecified Ticker")
        if not StockRecommendation.objects.filter(ticker=requested_ticker).exists():
            # Requested ticker does not exist in our records
            return Response(status=400, data="Invalid Ticker")
        info = StockRecommendation.objects.all().filter(ticker=requested_ticker)
        if info.exists():
            # Return found info
            return Response(status=200, data=info[0].recommendation, content_type="application/json")
        # No content found; default condition
        return Response(status=204)

    @action(methods=['put'], detail=False)
    def updateByTicker(self, request):
        to_update_ticker = request.query_params.get('ticker')
        new_recommendation = request.query_params.get('recommendation')
        if not to_update_ticker:
            # Ticker field empty
            return Response(status=400, data="Unspecified Ticker")
        if not new_recommendation:
            # No new recommendation
            return Response(status=204, data="Unspecified Recommendation")
        if not StockRecommendation.objects.all().filter(ticker=to_update_ticker).exists():
            # Requested ticker doess not exist in our records
            return Response(status=400, data="Invalid Ticker")
        record = StockRecommendation.objects.get(ticker=to_update_ticker)
        # Modify data
        record.update_recommendation(new_recommendation)
        return Response(status=200, data=serializers.serialize('json',[record]))
