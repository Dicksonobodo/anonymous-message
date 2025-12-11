# Anonymous Message Board

A secure, anonymous messaging platform built with React, Firebase, and Vite.

## Features

- 🔒 **Completely Anonymous** - Share messages without revealing your identity
- 💬 **Real-time Messaging** - Messages delivered instantly
- ✨ **Secure** - All data stored securely in Firebase
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 👨‍💼 **Admin Dashboard** - View and manage all messages

## Tech Stack

- **Frontend**: React 19 + Vite 7
- **Backend**: Firebase (Auth + Firestore)
- **Styling**: Pure CSS with responsive design
- **Routing**: React Router DOM 7

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Dicksonobodo/anonymous-message.git
cd anonymous-message/anonymous-site
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env.local file**
Copy `.env.example` to `.env.local` and add your Firebase credentials:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Deploying to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Import on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." → "Project"
3. Select your `anonymous-message` repository
4. Click "Import"

### Step 3: Set Environment Variables

Before deploying:
1. In the Environment Variables section, add all 7 Firebase variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`

2. Get these values from your Firebase project settings
3. Click "Deploy"

### Step 4: Configure Firestore Rules

Once deployed, configure your Firestore security rules:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
      allow delete: if request.auth.uid == "YOUR_ADMIN_UID";
      allow update: if false;
    }
  }
}
```

Replace `YOUR_ADMIN_UID` with your admin user's UID from Firebase Authentication.

## Project Structure

```
anonymous-site/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── routes/         # Route configurations
│   ├── context/        # React Context
│   ├── firebase/       # Firebase setup
│   ├── hooks/          # Custom hooks
│   ├── styles/         # Global CSS
│   ├── App.jsx
│   └── main.jsx
├── public/             # Static files
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Security Notes

- Your Firebase API key is exposed in client-side code (this is by design for web apps)
- Firebase security rules in Firestore protect your database
- Keep your `.env.local` file private and never commit it
- Set strong Firestore rules before going production

## License

MIT
