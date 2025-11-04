import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// Read Firebase config from app config (expo 'extra')
const firebaseConfig = Constants.expoConfig?.extra?.firebase || {
  apiKey: "AIzaSyDSQXsw1_NzMRYTKfo61BsuDXXZv5EphDg",
  authDomain: "hotelbooker-7d7c3.firebaseapp.com",
  projectId: "hotelbooker-7d7c3",
  storageBucket: "hotelbooker-7d7c3.firebasestorage.app",
  messagingSenderId: "880718257621",
  appId: "1:880718257621:web:25c3047526acdf956a715c",
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Firebase initialization error:', error);
}

const auth = getAuth(app);
const db = getFirestore(app);

console.log('✅ Firebase initialized with project:', firebaseConfig?.projectId);

export { auth, db };

