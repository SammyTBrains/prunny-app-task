// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE_API_KEY, FIREBASE_APP_ID } from "@/env";
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "prunny-task.firebaseapp.com",
  projectId: "prunny-task",
  storageBucket: "prunny-task.appspot.com",
  messagingSenderId: "336344562166",
  appId: FIREBASE_APP_ID,
  measurementId: "G-E1SFMBGQBC",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
