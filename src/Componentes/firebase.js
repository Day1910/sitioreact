// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBAUnfCY_MV8tavvpid4qmCROZKjxnSKm4',
    authDomain: 'fb-bdreact-657de.firebaseapp.com',
    projectId: 'fb-bdreact-657de',
    storageBucket: "fb-bdreact-657de.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;
