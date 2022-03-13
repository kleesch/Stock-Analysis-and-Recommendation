from rest_framework import serializers

from .models import Stock, DailyStockData, WatchedStock, WatchedStockList


class StockSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stock
        fields = ('ticker', 'company_info')


class DailyStockDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DailyStockData
        fields = ("ticker", "date", "open", "high", "low", "close", "volume")

class WatchedStockSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WatchedStock
        fields = ("ticker", "date", "open", "high", "low", "close", "volume", "username")
