import { initializeApp } from 'firebase/app';
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { FirebaseConfig } from '../../config/FirebaseConfig';

const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const currentUser = auth.currentUser;
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

export {
  db,
  auth,
  currentUser,
  googleAuthProvider,
  githubAuthProvider
};

