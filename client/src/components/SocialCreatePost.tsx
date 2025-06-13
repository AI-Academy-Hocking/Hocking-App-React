import { useState } from "react";
import { db, storage, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Filter from "bad-words";

export default function SocialCreatePost() {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const filter = new Filter();
    const cleanContent = filter.clean(content);
    let mediaUrl = "";
    if (media) {
      const fileRef = ref(storage, `posts/${auth.currentUser.uid}/${media.name}`);
      await uploadBytes(fileRef, media);
      mediaUrl = await getDownloadURL(fileRef);
      // TODO: Add moderation API call here
    }
    await addDoc(collection(db, "posts"), {
      userId: auth.currentUser.uid,
      content: cleanContent,
      mediaUrl,
      createdAt: serverTimestamp(),
      likes: [],
      comments: [],
    });
    setContent("");
    setMedia(null);
    setSuccess("Post created!");
    setLoading(false);
  };

  return (
    <form onSubmit={handlePost} className="space-y-4 max-w-xl mx-auto p-4 border rounded">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What's on your mind?" required className="w-full p-2 border rounded min-h-[80px]" />
      <input type="file" accept="image/*,video/*" onChange={e => setMedia(e.target.files[0])} className="w-full" />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Posting..." : "Post"}</button>
    </form>
  );
} 