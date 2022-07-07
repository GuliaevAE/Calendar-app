import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app'
// import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore'
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyDhcemwbx2PkqMJ3zLwrX5fJ5O1PBYvWzc",
  authDomain: "calendar-app-6279d.firebaseapp.com",
  databaseURL: "https://calendar-app-6279d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "calendar-app-6279d",
  storageBucket: "calendar-app-6279d.appspot.com",
  messagingSenderId: "135237774723",
  appId: "1:135237774723:web:27ba218ce83db7ddfe1ab6",
  measurementId: "G-T4K2LTLPLP"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);


export const Context = createContext(null)
const firestore = getFirestore(firebaseApp)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{firebaseApp, firestore}}>
    <App />
    </Context.Provider>
    
  </React.StrictMode>
);

