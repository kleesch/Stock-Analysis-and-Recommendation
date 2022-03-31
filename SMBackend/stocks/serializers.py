from rest_framework import serializers

from .models import Stock, DailyStockData, StockRecommendation, WatchedStock


class StockSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stock
        fields = ('ticker', 'company_info')

class StockRecommendationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StockRecommendation
        fields = ('ticker', 'recommendation')

class DailyStockDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DailyStockData
        fields = ("ticker", "date", "open", "high", "low", "close", "volume")

class WatchedStockSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WatchedStock
        fields = ("ticker", "username")
