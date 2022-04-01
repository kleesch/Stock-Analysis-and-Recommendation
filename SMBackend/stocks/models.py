from django.db import models
import datetime


# Create your models here.

class Stock(models.Model):
    ticker = models.CharField(max_length=5, primary_key=True, unique=True)
    company_info = models.CharField(max_length=120)

    def __str__(self):
        return self.ticker


class StockRecommendation(models.Model):
    ticker = models.CharField(max_length=5)
    recommendation = models.CharField(max_length=4)  # What the recommendation is [Buy/Hold/Sell]
    recommendation_date = models.DateField()  # What date the recommendation was made on

    buy_counter = models.IntegerField(default=0)  # Number of time recommended buy
    buy_correct_counter = models.IntegerField(default=0)  # Number of times above recommendation was correct

    hold_counter = models.IntegerField(default=0)  # Number of time recommended hold
    hold_correct_counter = models.IntegerField(default=0)  # Number of times above recommendation was correct

    sell_counter = models.IntegerField(default=0)  # Number of time recommended sell
    sell_correct_counter = models.IntegerField(default=0)  # Number of times above recommendation was correct

    def update_recommendation(self, new_recommendation, correct):
        match self.recommendation:  # Update counters to reflect previous match
            case "Buy":
                self.buy_counter += 1
                if correct:
                    self.buy_correct_counter += 1
            case "Hold":
                self.hold_counter += 1
                if correct:
                    self.hold_correct_counter += 1
            case "Sell":
                self.sell_counter += 1
                if correct:
                    self.sell_correct_counter += 1

        self.recommendation = new_recommendation  # Update to new recommendation
        self.recommendation_date = datetime.date.today()  # Update to new date TODO: Double check that this saves correctly

        self.save()  # Save changes

    def __str__(self):
        return f'{self.ticker.__str__()} {self.recommendation.__str__()}'


class DailyStockData(models.Model):
    ticker = models.CharField(max_length=5)
    date = models.DateField()
    open = models.DecimalField(max_digits=10, decimal_places=4)
    high = models.DecimalField(max_digits=10, decimal_places=4)
    low = models.DecimalField(max_digits=10, decimal_places=4)
    close = models.DecimalField(max_digits=10, decimal_places=4)
    volume = models.IntegerField()

    def __str__(self):
        return self.ticker.__str__() + " " + self.date.__str__()


class WatchedStock(models.Model):
    ticker = models.CharField(max_length=5)
    username = models.CharField(max_length=100)  # <--foreign key?

    def __str__(self):
        self.ticker.str() + " " + self.username.str()
