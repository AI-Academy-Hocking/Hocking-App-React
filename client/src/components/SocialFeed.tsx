import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc, arrayUnion } from "firebase/firestore";

export default function SocialFeed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const handleLike = async (postId) => {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { likes: arrayUnion(auth.currentUser.uid) });
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {posts.map(post => (
        <div key={post.id} className="border rounded p-4">
          <p>{post.content}</p>
          {post.mediaUrl && <img src={post.mediaUrl} alt="" style={{ maxWidth: 300 }} />}
          <button onClick={() => handleLike(post.id)} className="text-blue-600">Like ({post.likes.length})</button>
          {/* Add comments, share, etc. */}
        </div>
      ))}
    </div>
  );
} 