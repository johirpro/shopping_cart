import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "./firebase"; // your firebase config

export async function loginWithGoogle() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  return result;
}
