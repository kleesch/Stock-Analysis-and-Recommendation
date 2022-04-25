from django.db import models
from datetime import date


class Stock(models.Model):
    ticker = models.CharField(max_length=5, primary_key=True, unique=True)
    company_info = models.CharField(max_length=120)

    def __str__(self):
        return self.ticker


class StockBuyCycle(models.Model):
    ticker = models.CharField(max_length=5)
    buy_date = models.DateField()
    sell_date = models.DateField()
    total_return = models.DecimalField(max_digits=12, decimal_places=8, default=0)

    def __str__(self):
        return self.ticker


class StockRecommendation(models.Model):
    ticker = models.CharField(max_length=5)
    recommendation = models.CharField(max_length=5)
    buy_price = models.DecimalField(max_digits=10, decimal_places=4, default=0)
    buy_cycle = models.BooleanField(default=False)
    total_return = models.DecimalField(max_digits=12, decimal_places=8, default=0)
    number_cycles = models.IntegerField(default=0)
    buy_date = models.DateField()

    def update_recommendation(self, new_recommendation, new_price, update_date):
        if self.buy_cycle:  # We are currently in a buy cycle, and there is a new recommenda tion!
            if new_recommendation == "Sell":  # If we are selling our stock, then we must calculate the return
                self.number_cycles += 1  # Increment the number of buy cycles we have had
                this_return = (new_price - self.buy_price) / self.buy_price  # Calculate the return of this cycle
                self.total_return += this_return

                # Archive new record
                archived_cycle = StockBuyCycle(ticker=self.ticker, buy_date=self.buy_date, sell_date=update_date,
                                               total_return=this_return)
                archived_cycle.save()

                self.buy_cycle = False  # We are now out of the buy cycle
        elif new_recommendation == "Buy":  # We are not in a buy cycle, and the new recommendation is to buy!
            self.buy_price = new_price
            self.buy_date = update_date
            self.buy_cycle = True
        self.recommendation = new_recommendation
        self.save()

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

    def remove_watchlist(self):
        self.delete()

    def __str__(self):
        self.ticker.str() + " " + self.username.str()
