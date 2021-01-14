import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB-2Yel-sW2C5rSr7svAOVecogqvUtRvfU",
  authDomain: "liverates-yb.firebaseapp.com",
  databaseURL: "https://liverates-yb-default-rtdb.firebaseio.com",
  projectId: "liverates-yb",
  storageBucket: "liverates-yb.appspot.com",
  messagingSenderId: "325760070986",
  appId: "1:325760070986:web:57a1d744d16f1737743db3",
  measurementId: "G-YW573RGLGZ",
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fireDb.database().ref();
