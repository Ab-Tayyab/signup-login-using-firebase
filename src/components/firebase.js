
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDeSayb2YvosYwdsqNraNGlQwJ5MPyDi4A",
    authDomain: "userform-88164.firebaseapp.com",
    projectId: "userform-88164",
    storageBucket: "userform-88164.appspot.com",
    messagingSenderId: "975821375975",
    appId: "1:975821375975:web:81038b2cdc475f99bf9542",
    measurementId: "G-WD3CZ55N88"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
