from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'stocks', views.StockViewSet)
router.register(r'dailystocks', views.DailyStockDataViewSet)
router.register(r'recommendedstocks', views.StockRecommendationViewSet)
router.register(r'watchedstocks', views.WatchedStockViewSet)
router.register(r'buysellhistory', views.StockBuyCycleViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/', include(router.urls)),
]