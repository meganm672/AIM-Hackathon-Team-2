# goals/urls.py
from django.urls import path
from .views import (
    UserView,
    UserViewbyid,
    CategoryView,
    CategoryViewbyid,
    ChallengeView,
    ChallengeViewbyid,
    GoalView,
    GoalViewbyid,
    BadgeView,
    BadgeViewbyid,
)

urlpatterns = [
    path("users/", UserView.as_view()),
    path("categories/", CategoryView.as_view()),
    path("challenges/", ChallengeView.as_view()),
    path("goals/", GoalView.as_view()),
    path("badges/", BadgeView.as_view()),
    path("users/<int:id>/", UserViewbyid.as_view()),
    path("categories/<int:id>/", CategoryViewbyid.as_view()),
    path("challenges/<int:id>/", ChallengeViewbyid.as_view()),
    path("goals/<int:id>/", GoalViewbyid.as_view()),
    path("badges/<int:id>/", BadgeViewbyid.as_view()),
]
