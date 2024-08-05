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
    collection,
    updateDoc,
    getDocs,
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

export const addGroupedDataToFirestore = async (collectionKey, objects) => {
  const collectionRef = collection(db, collectionKey);

  // Group items by type
  const groupedData = objects.reduce((acc, obj) => {
    const type = obj.type.toLowerCase();
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(obj);
    return acc;
  }, {});

  // Upload each type as a separate document
  for (const [type, items] of Object.entries(groupedData)) {
    const docRef = doc(collectionRef, type);
    await setDoc(docRef, { items });
  }

  console.log('All documents added successfully');
};
export const getCategoriesAndDocuments = async (collectionKey) => {
  const collectionRef = collection(db, collectionKey);
  const querySnapshot = await getDocs(collectionRef);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const data = docSnapshot.data();
    const type = docSnapshot.id;
    if (data && data.items) {
      acc[type] = data.items;
    }
    return acc;
  }, {});
  return categoryMap;
};
export const getAuthDocuments = async (uid) => {
  if (!uid) return null;
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return { uid, ...userDoc.data() };
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
};

export const createQueryDocumentOnFireStore = async (newQuery) => {
  try {
    const docRef = doc(db, 'serviceDeskData', 'queries');
    
    // Fetch the current document
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Document exists, update it
      const data = docSnap.data();
      const existingQueries = data.queries || [];
      
      // Append the new query to the existing queries
      const updatedQueries = [...existingQueries, newQuery];
      
      // Update the document with the new list of queries
      await updateDoc(docRef, { queries: updatedQueries });
      console.log('Query added successfully!');
    } else {
      // Document does not exist, create it with the new query
      await setDoc(docRef, { queries: [newQuery] });
      console.log('Document created and query added successfully!');
    }
  } catch (error) {
    console.error('Error updating document:', error);
  }
}
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef); 

  if(!userSnapShot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const queries = null;
    const cart = null;

    try{
      await setDoc(userDocRef,{displayName, email, createdAt,queries,cart});
    }catch(error){
      console.log('error creating the user');
    }
  }
  console.log(userSnapShot.exists());
  return userDocRef;
}
export const updateCartItems = async (userId, cartItems) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { cart: cartItems });
    console.log('Cart items updated successfully');
  } catch (error) {
    console.error('Error updating cart items:', error);
  }
};
export const updateQueryItems  = async (userId, queryItems) => {
  try{
    const userDocRef = doc(db,'users', userId);
    await updateDoc(userDocRef, {queries: queryItems});
    console.log('Query items updated');
  } catch( error){
    console.log('Error updating query items:', error);
  }
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