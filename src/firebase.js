import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
    apiKey: "AIzaSyC71DTFMwOJjZaO4lak6K6rbY11YT0rop4",
    authDomain: "vues-project-school.firebaseapp.com",
    databaseURL: "https://vues-project-school-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vues-project-school",
    storageBucket: "vues-project-school.appspot.com",
    messagingSenderId: "133078657843",
    appId: "1:133078657843:web:b5c6bbafcf93f0ca032c46",
    measurementId: "G-6K96HHECG6"

}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
    db,
    auth,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}