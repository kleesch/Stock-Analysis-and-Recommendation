from django.shortcuts import render

# views.py
from rest_framework import viewsets, views
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import PersonSerializer
from .models import User
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from .permission import UserPermission


class PersonViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('username')
    serializer_class = PersonSerializer

    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes=[UserPermission]

    # POST api/persons/login
    # Returns a user's token upon successful login request
    # Possible Reponses: 200 OK, 204 No Content, 400 Bad Request
    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    def login(self, request):
        if (not "username" in request.data or not "password" in request.data):
            return Response(status=400)
        person = User.objects.all().filter(username=request.data["username"], password=request.data["password"])
        if person.exists():
            token, created = Token.objects.get_or_create(user=person[0])
            print(token.key)
            return Response(status=200, data=token.key)
        return Response(status=204)