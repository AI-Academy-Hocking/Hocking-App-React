import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function SocialSignUp() {
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email.endsWith("@hocking.edu")) {
      setError("Use your Hocking College email.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        studentId,
        avatarUrl: "",
        bio: "",
        notificationsEnabled: true,
      });
      setSuccess("Account created! You can now log in.");
      setEmail(""); setStudentId(""); setPassword(""); setName("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4 max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold">Sign Up</h2>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required className="w-full p-2 border rounded" />
      <input value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="Student ID" required className="w-full p-2 border rounded" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full p-2 border rounded" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 border rounded" />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
} 