import {createStore, combineReducers, compose} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';

import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer, reduxFirestore } from 'redux-firestore';

import settingReducer  from '../reducer/settingReducer';

const firebaseConfig = {
    apiKey: "AIzaSyAWLEWU9GraLJRGkvkzpY4rJC3dbyIRI8I",
    authDomain: "admin-page-9f154.firebaseapp.com",
    databaseURL: "https://admin-page-9f154.firebaseio.com",
    projectId: "admin-page-9f154",
    storageBucket: "admin-page-9f154.appspot.com",
    messagingSenderId: "226814867107"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};


// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true}; 
firestore.settings(settings);

// Initialize other services on firebase instance
firebase.firestore();  // <- needed if using firestore


// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore);


// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    settings: settingReducer 
});

// check localstorage

if(localStorage.getItem('localStorageSetting') == null) {

    const defaultLocalStorage = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
    };

    localStorage.setItem('localStorageSetting', JSON.stringify(defaultLocalStorage));
}


// Create store with reducers and initial state
const initialState = {
    settings: JSON.parse(localStorage.getItem('localStorageSetting'))
};
const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));


export default store;