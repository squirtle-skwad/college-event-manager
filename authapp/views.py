from django.shortcuts import HttpResponse
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .serializers import *
from .models import *


@api_view(["GET"])
def user_profile(request, username):
    """ List all events according to month and year """
    if request.method == "GET":
        user = User.objects.filter(username=username)
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SignUp(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignUpSerializer


def activate(request, uidb64, token):
    try:
        user = User.objects.get(pk=uidb64)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return HttpResponse("User Verification Successful")

    else:
        return HttpResponse("User verification failed")
