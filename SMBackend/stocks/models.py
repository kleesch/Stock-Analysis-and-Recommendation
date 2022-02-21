from django.db import models


# Create your models here.

class Stock(models.Model):
    ticker = models.CharField(max_length=5, primary_key=True, unique=True)
    company_info = models.CharField(max_length=120)

    def __str__(self):
        return self.ticker


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