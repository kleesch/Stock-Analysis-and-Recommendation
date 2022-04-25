from rest_framework import serializers

from .models import Stock, DailyStockData, StockRecommendation, WatchedStock, StockBuyCycle


class StockSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stock
        fields = ('ticker', 'company_info')


class StockRecommendationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StockRecommendation
        fields = ('ticker', 'recommendation', 'buy_price', 'buy_cycle', 'total_return', 'number_cycles', 'buy_date')


class DailyStockDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DailyStockData
        fields = ("ticker", "date", "open", "high", "low", "close", "volume")


class WatchedStockSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WatchedStock
        fields = ("ticker", "username")


class StockBuyCycleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StockBuyCycle
        fields = ("ticker", "buy_date", "sell_date", "total_return")
