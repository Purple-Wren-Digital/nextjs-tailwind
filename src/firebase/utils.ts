import { auth } from './config';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';

export const firebaseSignUp = async (email: string, password: string) => {
  let result: UserCredential | null = null;
  let error: Error | null = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      error = e;
    } else {
      console.error('Unexpected error:', e);
    }
  }
  return { result, error };
};

export const firebaseSignIn = async (email: string, password: string) => {
  let result: UserCredential | null = null;
  let error: Error | null = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      error = e;
    } else {
      console.error('Unexpected error:', e);
    }
  }
  return { result, error };
};

export const firebaseSignOut = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    console.log(e);
  }
};

export const firebaseValidateEmailAddress = async (email: string) => {
  let error: string = '';
  const re = /\S+@\S+\.\S+/;
  if (re.test(email) === false) {
    error = 'Invalid email address';
    return error;
  }
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods && signInMethods.length > 0) {
      error = 'Email is already registered';
      return error;
    }
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      error = e.message;
    } else {
      console.error('Unexpected error:', e);
    }
  }
  return error;
};

// For use with Firestore

// export const addFirestoreData = async (
// 	collection: string,
// 	id: string,
// 	data: Record<string, any>,
// ) => {
// 	let result: void = undefined;
// 	let error: Error | null = null;

// 	try {
// 		const userDocRef = doc(db, collection, id);
// 		result = await setDoc(userDocRef, data, { merge: true });
// 	} catch (e) {
// 		console.error(e);
// 		if (e instanceof Error) {
// 			error = e;
// 		} else {
// 			console.error('Unexpected error:', e);
// 		}
// 	}

// 	return { result, error };
// };

// export const getFirestoreData = async () => {
// 	const email = fbAuth.currentUser?.email;
// 	if (!email) {
// 		return { result: null, error: 'No user email' };
// 	}
// 	let result: DocumentData = {};
// 	let error: Error | null | string = null;
// 	try {
// 		const docRef = doc(db, 'users', email);
// 		const docSnap = await getDoc(docRef);
// 		if (docSnap.exists()) {
// 			result = docSnap.data();
// 		} else {
// 			error = 'No such document!';
// 		}
// 	} catch (e) {
// 		console.error(e);
// 		if (e instanceof Error) {
// 			error = e;
// 		} else {
// 			console.error('Unexpected error:', e);
// 		}
// 	}

// 	return { result, error };
// };
