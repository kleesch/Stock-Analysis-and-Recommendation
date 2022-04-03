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
    permission_classes = [UserPermission]

    # POST api/persons/signup
    # Creates a new user account in a more secure environment than normal Django post
    # Possible Responses: 201 Created, 409 Conflict, 400 Bad Request
    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    def signup(self, request):
        if "username" not in request.data or "password" not in request.data:
            return Response(status=400, data="Missing Username/Password")
        if request.data["username"] == "" or request.data["password"] == "":
            return Response(status=400, data="Username or Password Blank")
        existing_account = User.objects.all().filter(username=request.data["username"])
        if existing_account.exists():
            return Response(status=409, data="Username Exists")
        User.objects.create_user(username=request.data["username"], password=request.data["password"])
        return Response(status=201)

    # POST api/persons/login
    # Returns a user's token upon successful login request
    # Possible Responses: 200 OK, 204 No Content, 400 Bad Request
    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    def login(self, request):
        if (not "username" in request.data or not "password" in request.data):
            return Response(status=400)
        person = User.objects.all().filter(username=request.data["username"])
        if person.exists():
            user = User.objects.get(username=request.data["username"])
            if user.check_password(request.data["password"]):
                token, created = Token.objects.get_or_create(user=user)
                return Response(status=200, data=token.key)
        return Response(status=204)

    # GET api/persons/isStaff
    # Returns if the currently logged in is a staff member
    # Possible Responses: 200 OK
    @action(methods=['get'], detail=False, permission_classes=[])
    def isStaff(self, request):
        return Response(status=200, data=request.user.is_staff)
