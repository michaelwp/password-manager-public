import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCv2wxu69UlyPvakcpEBUnMebgDIN2LBjw",
    authDomain: "password-managers.firebaseapp.com",
    databaseURL: "https://password-managers.firebaseio.com",
    projectId: "password-managers",
    storageBucket: "password-managers.appspot.com",
    messagingSenderId: "148452590716",
    appId: "1:148452590716:web:68f38c77400687cbe6f5f9"
};

firebase.initializeApp(firebaseConfig);

export default firebase;