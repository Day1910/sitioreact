// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDCuUNOPxsGY1hfNDzyicb-Lh9EHr5oAe0',
    authDomain: 'bd-react2.firebaseapp.com',
    projectId: 'bd-react2',
    storageBucket: "bd-react2.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;
