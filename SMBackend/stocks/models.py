from django.db import models


# Create your models here.

class Stock(models.Model):
    ticker = models.CharField(max_length=5, primary_key=True, unique=True)
    company_info = models.CharField(max_length=120)

    def __str__(self):
        return self.ticker

class StockRecommendation(models.Model):
    ticker = models.CharField(max_length=5)
    recommendation = models.CharField(max_length=5)
    
    def update_recommendation(self, new_recommendation):
        self.recommendation = new_recommendation
        self.save()

    def __str__(self):
        self.ticker.str()+" "+self.recommendation.str()

class DailyStockData(models.Model):
    ticker = models.CharField(max_length=5)
    date = models.DateField()
    open = models.DecimalField(max_digits=10, decimal_places=4)
    high = models.DecimalField(max_digits=10, decimal_places=4)
    low = models.DecimalField(max_digits=10, decimal_places=4)
    close = models.DecimalField(max_digits=10, decimal_places=4)
    volume = models.IntegerField()
    
    def __str__(self):
        return self.ticker.__str__()+" "+self.date.__str__()

class WatchedStock(models.Model):
    ticker = models.CharField(max_length=5)
    username = models.CharField(max_length=100) #<--foreign key?

    def remove_watchlist(self):
        self.delete()

    def __str__(self):
        self.ticker.str()+" "+self.username.str()


