import React, { useState, useRef } from "react";

import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/Signin";
import SignOut from "./components/Signout"

import "./App.css";

firebase.initializeApp({
  apiKey: "AIzaSyBz6KLlCCzEtfCqGpmhL2ptlrbUnaNtnsk",
  authDomain: "superchat-eb769.firebaseapp.com",
  databaseURL: "https://superchat-eb769.firebaseio.com",
  projectId: "superchat-eb769",
  storageBucket: "superchat-eb769.appspot.com",
  messagingSenderId: "649368696002",
  appId: "1:649368696002:web:842feab3eb2b549290b75b",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const dummy = useRef();
  const [user, loading, error] = useAuthState(auth);
  const [formValue, setFormValue] = useState('')
  const messageRef = firestore.collection("messages");

  const query = messageRef.orderBy("createdAt").limit(25);
  const [ messages ] = useCollectionData(query, { idField: "id" });

  

  
  
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('');

    dummy.current.scrollIntoView({ behavior: 'smooth'});
  }

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className='App'>
    {loading && (
      <div>
        <p>Initialising User...</p>
      </div>
    )}
    {error && (
      <div>
        <p>Error: {error}</p>
      </div>
    )}
      <header>
        <p>Current User:</p>
        <SignOut auth={auth} />
      </header>

      <section>
        {user ? (
          <ChatRoom messages={messages} formValue={formValue} setFormValue={setFormValue} sendMessage={sendMessage} dummy={dummy} auth={auth} />
        ) : (
          <SignIn signInWithGoogle={signInWithGoogle} />
        )}
      </section>
    </div>
  );
}

export default App;
