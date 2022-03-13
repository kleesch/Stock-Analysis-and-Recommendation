from rest_framework import serializers

from .models import User


class NewUserSerializer(serializers.HyperlinkedModelSerializer): #change from PersonSerializer?
    class Meta:
        model = User
        fields = ("username", "email", "is_active", "is_staff")
        extra_kwargs = {'password': {'write_only': True}}

         def create(self, validated_data):
             user = User(
                 email=validated_data['email'],
                 username=validated_data['username']
                 )
                 user.set_password(validated_data['password'])
                 user.save()
                 return user
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