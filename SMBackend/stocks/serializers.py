from rest_framework import serializers

from .models import Stock


class StockSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stock
        fields = ('ticker', 'company_info')


class DailyStockDataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stock
        fields = ("ticker", "open", "high", "low", "close", "volume")
