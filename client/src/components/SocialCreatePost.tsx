import { useState, FormEvent, ChangeEvent } from "react";
import { db, storage, auth } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Filter } from "bad-words";

export default function SocialCreatePost() {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    try {
      // Filter out bad words like Roblox
      const filter = new Filter();
      const cleanContent = filter.clean(content);
      
      let mediaUrl = "";
      if (media) {
        const fileRef = ref(storage, `posts/${auth.currentUser?.uid}/${media.name}`);
        await uploadBytes(fileRef, media);
        mediaUrl = await getDownloadURL(fileRef);
        // TODO: Add moderation API call here
      }
      
      await addDoc(collection(db, "posts"), {
        userId: auth.currentUser?.uid,
        content: cleanContent,
        mediaUrl,
        createdAt: serverTimestamp(),
        likes: [],
        comments: [],
      });
      
      setContent("");
      setMedia(null);
      setSuccess("Post created!");
    } catch (err) {
      setError("Failed to create post. Please try again.");
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setMedia(files[0]);
    }
  };

  return (
    <form onSubmit={handlePost} className="space-y-4 max-w-xl mx-auto p-4 border rounded">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-white">{success}</div>}
      <textarea 
        value={content} 
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} 
        placeholder="What's on your mind?" 
        required 
        className="w-full p-2 border rounded min-h-[80px]" 
      />
      <input 
        type="file" 
        accept="image/*,video/*" 
        onChange={handleMediaChange} 
        className="w-full" 
      />
      <button 
        type="submit" 
        className="bg-primary text-white px-4 py-2 rounded" 
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
} 
