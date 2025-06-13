import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc as firestoreDoc, arrayUnion, QueryDocumentSnapshot, DocumentData, QuerySnapshot } from "firebase/firestore";

interface Comment {
  userId: string;
  text: string;
  createdAt?: any;
}

interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrl?: string;
  likes: string[];
  comments: Comment[];
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      setPosts(snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({ id: doc.id, ...doc.data() as Omit<Post, 'id'> })));
    });
    return unsub;
  }, []);

  const handleLike = async (postId: string) => {
    const postRef = firestoreDoc(db, "posts", postId);
    await updateDoc(postRef, { likes: arrayUnion(auth.currentUser?.uid) });
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {posts.map((post) => (
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