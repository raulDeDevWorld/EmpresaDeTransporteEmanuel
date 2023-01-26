import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config'
import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut  } from "firebase/auth";
import { getDatabase, ref, onValue, update, child, get, remove} from "firebase/database";

const app = initializeApp(firebaseConfig)

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

function onAuth(setUserProfile, setUserData) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserProfile(user)
      getData(`/`, setUserData)
    } else {
      setUserProfile(user)
    }
  });
}

// ---------------------------Login, Sign Up and Sign In------------------------------------

function signUpWithEmail (email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...

    writeUserData(`/users/${user.uid}`, {email: user.email, rol: 'N/A'}, null)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}
function signInWithEmail (email, password) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

function withGoogle () {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...

    // writeUserData(`/users/${user.uid}`, {email: user.email, rol: 'N/A'}, null)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

function handleSignOut () {
  signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}

// -------------------------------Firebase Realtime Database------------------------------------

const dbRef = ref(getDatabase());

function getData(rute, setUserData) {
 
  onValue(ref(db, rute), (snapshot) => {
    if (snapshot.exists()) {
          const data = snapshot.val()
          setUserData(snapshot.val())
        } else {
          setUserData('');
        }
    
  });
}


 // get(child(dbRef, `users/`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     setUserData(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });


function getSpecificData(query, setUserSpecificData) {

  get(child(dbRef, `${query}`)).then((snapshot) => {
    if (snapshot.exists()) {
      setUserSpecificData(snapshot.val()) 
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

function writeUserData (rute, object, setUserSuccess) {
  update(ref(db, rute), object )
  .then(()=> setUserSuccess ? setUserSuccess('save'): '')
  .catch(()=>setUserSuccess('repeat'))
}

async function removeData (rute, setUserData, setUserSuccess) {
  await remove(ref(db, rute)).then(()=>setUserSuccess('save')).catch(()=>setUserSuccess('repeat'));
  getData(setUserData)

}


export { onAuth, signUpWithEmail, signInWithEmail, withGoogle, handleSignOut, getData, getSpecificData, writeUserData, removeData }
