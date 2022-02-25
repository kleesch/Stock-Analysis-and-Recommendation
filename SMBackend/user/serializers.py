from rest_framework import serializers

from .models import User


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password", "is_active", "is_staff")
