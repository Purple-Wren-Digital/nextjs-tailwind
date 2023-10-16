import { auth, db } from "./config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";


export const signUp = async (email: string, password: string) => {
    let result = null;
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
}

export const signIn = async (email: string, password: string) => {
    let result = null;
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
}

export const signOut = async () => {
    try {
        await auth.signOut();
    } catch (e) {
        console.log(e);
    }
};

export const addData = async (collection: string, id: string, data: any) => {
    let result = null;
    let error: Error | null = null;

    try {
        result = await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            error = e;
        } else {
            console.error('Unexpected error:', e);
        }
    }

    return { result, error };
}

export const getData = async (collection: string, id: string) => {
    let result = null;
    let error: Error | null | string = null;
    try {
        const docRef = doc(db, collection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            result = docSnap.data();
        } else {
            error = "No such document!";
        }
    } catch (e) {
        console.error(e);
        if (e instanceof Error) {
            error = e;
        } else {
            console.error('Unexpected error:', e);
        }
    }

    return { result, error };
}