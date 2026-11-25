# Cloud To-Do List

A cloud-based task management app built with React, Vite, Firebase Authentication, and Cloud Firestore.

## Project Pages

### Login Page
Allows registered users to sign in with their email and password.

### Sign-Up Page
Allows new users to create an account.

### Task Management Page
Displays the signed-in user's tasks. Users can add, edit, delete, and complete tasks, set a priority and due date, search tasks, and filter them by priority.

## Data and Security

Tasks are stored in Cloud Firestore under each user's account:

`users/{uid}/tasks/{taskId}`

Firestore security rules restrict each user to their own tasks.

## Technologies

- React
- Vite
- Firebase Authentication
- Cloud Firestore

## Run the Project

```bash
cd app
npm install
npm run dev
```

## Try the application

Open the deployed application: https://cloudtodoapp-6a0ac.web.app