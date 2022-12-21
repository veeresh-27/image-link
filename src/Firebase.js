import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyAL4lE2OhZMmMYg-B4D4R82VZcN5eZjkUc",
    authDomain: "image-link-7294d.firebaseapp.com",
    projectId: "image-link-7294d",
    storageBucket: "image-link-7294d.appspot.com",
    messagingSenderId: "345219852876",
    appId: "1:345219852876:web:8f86d0921e10a93e5fa2e9",
    measurementId: "G-L8D26WFWWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

export {app,analytics,storage};