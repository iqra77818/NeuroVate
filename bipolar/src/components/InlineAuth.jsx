import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signOut 
} from "firebase/auth";

export default function InlineAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowForm(false);
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowForm(false);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setShowForm(false);
        } catch (loginError) {
          alert("Login failed: " + loginError.message);
        }
      } else {
        alert("Signup failed: " + error.message);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  if (user) {
    const name = user.email.split("@")[0]; // everything before @
    return (
      <div className="flex items-center gap-2">
        <span className="dark:text-white font-semibold">Hi, {name}</span>
        <button 
          onClick={logout} 
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      {!showForm ? (
        <button 
          onClick={() => setShowForm(true)} 
          className="bg-white text-violet-400 px-3 py-2 dark:bg-violet-700 dark:text-white rounded"
        >
          Sign Up / Login
        </button>
      ) : (
        <div className="flex flex-col gap-2 p-4 border rounded dark:text-white dark:bg-gray-800">
          <input 
            className="border p-2 dark:bg-gray-700" 
            placeholder="Email"
            value={email} 
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            className="border p-2 dark:bg-gray-700" 
            placeholder="Password" 
            type="password"
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={login} className="bg-green-500 text-white px-3 py-1 rounded">Login</button>
            <button onClick={signup} className="bg-purple-500 text-white px-3 py-1 rounded">Sign Up</button>
            <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-3 py-1 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
