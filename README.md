# AIM Hackathon Team 2

# React + Express Boilerplate

## Getting Started

1. Clone your repository locally
2. Run `npm install` to install all the dependencies
3. Setup your `.env` file locally - you can use the `.env.example` as a guideline. In particular, you will need to setup `PORT` and `DATABASE_URL` environment variables. But you may as well at a `JWT_SECRET` while you're in there.
4. Run `npm run dev` to run locally


### Starting the App

Start just the server (great while only working on API endpoints)
```
npm run server:dev
```

For starting the full-stack application - the server will restart whenever changes are made in the `server` directory, and the React app will rebuild whenever changes are made in the `client` directory.

```
npm run dev
```

### Running Tests

This will run Jest with verbose output enabled:
```
npm run test
```

If you want Jest to continually run as files are changed, you can call:
```
npm run test -- --watch
```

Or if you want Jest to continually run all tests when files change:
```
npm run test -- --watchAll
```

### Seed the Database

This will run the `server/db/seed.js` file:
```
npm run seed
```

### Deploying the App

You will need to create a Database in your hosting provider of choice (Render or Heroku both work well, but only Render is free).

Once you have a Database URL setup, you will need to setup your Environment Variables to include your Database URL, as well as any other app secrets needed (eg. JWT secret, Client ID and Secret for OAuth, etc)

Whichever provider you use, you will need to set the following settings:

**Build Command:** `npm install && npm run seed && npm run build`
**Start Command:** `npm start`

## Basic File Structure
```
.
├── client/
├── dist (ignored by git)
├── node_modules (ignored by git)
├── server/
├── .gitignore
├── index.html
├── jest.config.js
├── package.json
├── README.md
└── vite.config.js
```

### Client Files

```
.
├── client/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
```

### Server Files

```
.
├── server/
│   ├── __tests__/
│   │   └── app.test.js
│   ├── api/
│   │   ├── index.js
│   │   └── // ... (etc, with nested folders for sub-routes as needed to keep organized)
│   ├── auth/
│   │   └── index.js (used for authenticating with your app)
│   ├── db/
│   │   ├── seed.js
│   │   └── // ... (optionally, add files / sub-folders with helper methods for accessing the DB with Prisma)
│   ├── app.js (configure the app)
│   └── index.js (start the app)
```

# For running backend API

**Prerequities**: Have Python installed: [Download link](https://www.python.org/downloads/)
<br>
The backend is implemented using [Django Rest Framework](https://medium.com/@bhatnagar.aman1998/creating-restful-apis-in-django-rest-framework-using-class-based-views-78202e129773) 
<br>
**Step 1**: Install the the necessary libraries
```
cd backend
pip install -r requirements.txt
```

**Step 2**: Run the server
```
python manage.py runserver
```

**Step 3**: Access the CRUD urls
For listing all goals:
```http://127.0.0.1:8000/api/goals/```
<br>
For listing goal with ID=1
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
