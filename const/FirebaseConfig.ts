import { getApp, getApps, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyC0fGnC1p30Pswr6Bd_jQBqOq3mTa5qIGs",
    authDomain: "nyc-blog.firebaseapp.com",
    projectId: "nyc-blog",
    storageBucket: "nyc-blog.appspot.com",
    messagingSenderId: "855651971402",
    appId: "1:855651971402:web:598b3e56d4a9eeb69811b3",
    measurementId: "G-JZ1Q8B71LM"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const storage = getStorage(app);