import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from '@env';
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

let app = false;
if ( !getApps().length ) {
  app = initializeApp( firebaseConfig );
}

export const auth = initializeAuth( app, {
  persistence: getReactNativePersistence( ReactNativeAsyncStorage )
});
export const db   = getFirestore( app );