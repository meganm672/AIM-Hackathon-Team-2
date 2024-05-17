from django.db import models


# Assuming you have collections named users, categories, challenges, goals, badges
class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category_name = models.CharField(max_length=255)


class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    goal_name = models.CharField(max_length=255)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    completed_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField(blank=True, null=True)
    priority = models.CharField(
        max_length=255, choices=[("low", "Low"), ("medium", "Medium"), ("high", "High")]
    )
    saving_frequency = models.CharField(
        max_length=255,
        choices=[
            ("daily", "Daily"),
            ("weekly", "Weekly"),
            ("bi-weekly", "Bi-weekly"),
            ("monthly", "Monthly"),
        ],
    )
    reminder_interval = models.JSONField(
        blank=True, null=True
    )  # Example: {"days": 7, "time": "09:00"}


class Challenge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    challenge_name = models.CharField(max_length=255)
    challenge_description = models.TextField()
    is_completed = models.BooleanField(default=False)
    is_goal = models.BooleanField(default=False)
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE)


class Badge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    badge_name = models.CharField(max_length=255)
    badge_description = models.TextField()
