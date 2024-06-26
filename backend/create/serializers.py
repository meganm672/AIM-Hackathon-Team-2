# goals/serializers.py
from rest_framework import serializers
from .models import User, Category, Challenge, Goal, Badge


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = "__all__"


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = "__all__"
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    completed_amount = serializers.DecimalField(max_digits=10, decimal_places=2)


class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = "__all__"
