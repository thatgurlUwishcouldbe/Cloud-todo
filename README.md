# Cloud-todo

A React task manager with Firebase Authentication and Cloud Firestore.

## Run the app

The runnable React app is in `app`:

```bash
npm install
npm run dev
```

## Firebase setup

The Firebase web configuration is in `app/src/firebase.js` (project ID: `cloudtodoapp-6a0ac`). In Firebase Console, enable **Authentication → Email/Password**, create a **Cloud Firestore** database if needed, then publish the rules in `firestore.rules`.

Tasks are stored under `users/{uid}/tasks`. The rules allow a signed-in user to access tasks only inside their own UID path.
