# AIM Hackathon Team 2- SaveUp
An incentive-based app, that empowers users to develop financial planning skills by setting financial goals, and solving skill-building challenges.


## Development Team

[Mudra Patel](https://github.com/mudrap17)
[Nathan Greuel](https://github.com/Nat-crit20)
[Megan Murphy-Marxen](https://github.com/meganm672)

## Deployed Site
https://saveup-wbae.onrender.com/

### Starting the App

For starting the full-stack application - the server will restart whenever changes are made in the `server` directory, and the React app will rebuild whenever changes are made in the `client` directory.

```
npm run client
```

### Deploying the App

You will need to create a Database in your hosting provider of choice (Render or Heroku both work well, but only Render is free).

Once you have a Database URL setup, you will need to setup your Environment Variables to include your Database URL, as well as any other app secrets needed (eg. JWT secret, Client ID and Secret for OAuth, etc)

Whichever provider you use, you will need to set the following settings:

**Build Command:** `npm instal && npm run build`



# For running backend API

**Prerequities**: Have Python installed: [Download link](https://www.python.org/downloads/)
</br> </br>
The backend is implemented using [Django Rest Framework](https://medium.com/@bhatnagar.aman1998/creating-restful-apis-in-django-rest-framework-using-class-based-views-78202e129773) and database integration is done with [Djongo](https://magbanum.com/blog/starting-django-project-with-mongodb-using-djongo)
</br> </br>
**Step 1**: Install the the necessary libraries
```
cd backend
pip install -r requirements.txt
```

**Step 2**: Run the server
```
python manage.py runserver
```

**Step 3**: Access the CRUD urls (GET, POST, PUT, DELETE)
</br>
+ For listing all goals: 
```http://127.0.0.1:8000/api/goals/```
</br> </br>
+ For listing goal with ID=1: 
```http://127.0.0.1:8000/api/goals/1/```

**Step 4**: Similarly access other urls
```
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
```

