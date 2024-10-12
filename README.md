# React Todo App

A feature-rich Todo application built with React and Firebase, featuring authentication, real-time updates, and offline capabilities.

## Demo

Check out the live demo of the app: [React Todo App Demo](https://dudedean-todoapp.netlify.app/)

## Features

- User Authentication (Email/Password and Google Sign-In)
- Create, Read, Update, and Delete (CRUD) operations for todos
- Real-time updates using Firebase Firestore
- Offline support with IndexedDB persistence
- Todo filtering (All, Active, Completed)
- Due date for todos
- Responsive design with Tailwind CSS
- Progressive Web App (PWA) support

## Technologies Used

- React
- Firebase (Authentication and Firestore)
- Tailwind CSS
- Service Workers for offline functionality

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/react-todo-app.git
   ```

2. Install dependencies:
   ```
   cd react-todo-app
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Email/Password and Google Sign-In methods in Authentication
   - Create a Firestore database
   - Copy your Firebase configuration

4. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. Start the development server:
   ```
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Deployment

To deploy the app, you can use services like Firebase Hosting, Vercel, or Netlify. Make sure to set up your environment variables in your deployment platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
