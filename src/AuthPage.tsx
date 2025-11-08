"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config"; // make sure you export `db` from firebase.ts

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Signup function
  const handleSignUp = async () => {
    try {
      setLoading(true);

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      alert("User signed up and data saved successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login function
  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-6 max-w-sm mx-auto mt-20 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-center">NutriFit Auth</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
      />

      <button
        onClick={handleSignUp}
        disabled={loading}
        className="bg-green-500 py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-500 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </div>
  );
}
