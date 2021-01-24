import firebase from 'firebase';
require("@firebase/firestore")
var firebaseConfig = {
  apiKey: "AIzaSyBD1yhVB1CO68thgrD06M7s64Nu4j7o0u8",
  authDomain: "barter-system-9c0a7.firebaseapp.com",
  projectId: "barter-system-9c0a7",
  storageBucket: "barter-system-9c0a7.appspot.com",
  messagingSenderId: "267443249788",
  appId: "1:267443249788:web:6f28cdc4dca48b4069dff9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();