import firebase from 'firebase';
import 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB0FYxg0D9cPecG3tOXRj2vSzgX_QYI6Oc",
    authDomain: "hosokawaportfolio.firebaseapp.com",
    projectId: "hosokawaportfolio",
    storageBucket: "hosokawaportfolio.appspot.com",
    messagingSenderId: "85621684002",
    appId: "1:85621684002:web:499305102aeccc75f9577b",
    measurementId: "G-NKK63RXMV5"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.firestore();
const firebaseProfile = 'profile';
const firebaseUsers = 'users';
const firebaseEducation = 'education';
const firebaseTraining = 'training';
const firebaseExperience = 'experience';
const firebaseSkills = 'skills';
const firebaseServices = 'services';
const firebaseFacts = 'facts';
const firebaseTestimonials = 'testimonials';
const firebasePortfolios = 'portfolios';

export {
    firebase,
    firebaseDB,
    firebaseProfile,
    firebaseUsers,
    firebaseEducation,
    firebaseTraining,
    firebaseExperience,
    firebaseSkills,
    firebaseServices,
    firebaseFacts,
    firebaseTestimonials,
    firebasePortfolios
}
