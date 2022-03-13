from rest_framework import serializers

from .models import User


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password", "is_active", "is_staff")
#class NewUserSerializer(serializers.ModelSerializer):
 # class Meta:
    # model = User
   # fields = ('email', 'username', 'password')
   # extra_kwargs = {'password': {'write_only': True}}

  # def create(self, validated_data):
  #  user = User(
   #     email=validated_data['email'],
    #    username=validated_data['username']
  #  )
   # user.set_password(validated_data['password'])
   # user.save()
    # return user