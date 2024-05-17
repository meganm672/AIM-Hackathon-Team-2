from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Category, Challenge, Goal, Badge
from .serializers import (
    UserSerializer,
    CategorySerializer,
    ChallengeSerializer,
    GoalSerializer,
    BadgeSerializer,
)


# Base class for CRUD operations
class CRUDView(APIView):
    model = None
    serializer_class = None

    def get(self, request):
        objects = self.model.objects.all()
        serializer = self.serializer_class(objects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CRUDViewbyid(APIView):
    model = None
    serializer_class = None

    def get_object(self, id):
        try:
            return self.model.objects.get(id=id)
        except self.model.DoesNotExist as e:
            return Response({"error": "Not found."}, status=404)

    def get(self, request, id=None):
        instance = self.get_object(id)
        serializer = self.serializer_class(instance)
        return Response(serializer.data)

    def put(self, request, id):
        try:
            object = self.model.objects.get(id=id)
        except Exception as e:
            return Response(
                {"error": f"Object not found: {e}"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = self.serializer_class(object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            object = self.model.objects.get(id=id)
            object.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {"error": f"Object not found or deletion failed: {e}"},
                status=status.HTTP_404_NOT_FOUND,
            )


# Specific views for each model
class UserView(CRUDView):
    model = User
    serializer_class = UserSerializer


class UserViewbyid(CRUDViewbyid):
    model = User
    serializer_class = UserSerializer


class CategoryView(CRUDView):
    model = Category
    serializer_class = CategorySerializer


class CategoryViewbyid(CRUDViewbyid):
    model = Category
    serializer_class = CategorySerializer


class ChallengeView(CRUDView):
    model = Challenge
    serializer_class = ChallengeSerializer


class ChallengeViewbyid(CRUDViewbyid):
    model = Challenge
    serializer_class = ChallengeSerializer


class GoalView(CRUDView):
    model = Goal
    serializer_class = GoalSerializer


class GoalViewbyid(CRUDViewbyid):
    model = Goal
    serializer_class = GoalSerializer


class BadgeView(CRUDView):
    model = Badge
    serializer_class = BadgeSerializer


class BadgeViewbyid(CRUDViewbyid):
    model = Badge
    serializer_class = BadgeSerializer
