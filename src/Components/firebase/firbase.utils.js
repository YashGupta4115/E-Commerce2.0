import { initializeApp } from "firebase/app";
import { 
  getAuth,
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKGujrLTbkmkRX2S5MRnYcbeJMjZ3HJKc",
  authDomain: "thevoguevariety-c27f3.firebaseapp.com",
  projectId: "thevoguevariety-c27f3",
  storageBucket: "thevoguevariety-c27f3.appspot.com",
  messagingSenderId: "642418142593",
  appId: "1:642418142593:web:645b99f8a6033caac58c80",
  measurementId: "G-MV440YHM0Y"
};

// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export const createEmpDocumentFromAuth = async(empAuth, additionalInformation={})=>{
  if(!empAuth) return;
  const empDocRef = doc(db, 'employess',empAuth.uid);

  const empSnapshot = await getDoc(empDocRef);
  if(!empSnapshot.exists()){
    const { displayName, email } = empAuth;
    const createdAt = new Date();

    try{
      await setDoc(empDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error){
      alert('error creatin the user');
      console.log(error,error.message);
    }
  }
    return empDocRef;
}

export const signInAuthWithEmailAndPassword = async (email, password) =>{
    if( !email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const onEmpStateChangedListener = (callback) => onAuthStateChanged(auth,callback);

export const SignOutAuth = async() => await signOut(auth);