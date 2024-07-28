// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
 } from "firebase/auth";

 import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
 }  from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKGujrLTbkmkRX2S5MRnYcbeJMjZ3HJKc",
  authDomain: "thevoguevariety-c27f3.firebaseapp.com",
  projectId: "thevoguevariety-c27f3",
  storageBucket: "thevoguevariety-c27f3.appspot.com",
  messagingSenderId: "642418142593",
  appId: "1:642418142593:web:645b99f8a6033caac58c80",
  measurementId: "G-MV440YHM0Y"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account" // Forces the user to select an account
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {

    if(!auth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, { displayName, email, createdAt});
        } catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return createUserWithEmailAndPassword(auth,email, password);
} 

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return signInWithEmailAndPassword(auth, email, password);
}

export const signOutAuth = async() => await signOut(auth);