import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";

type Notification = { id: string; text: string; read: boolean; createdAt?: any };

export default function SocialNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setNotifications(snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text || '',
          read: data.read ?? false,
          createdAt: data.createdAt
        };
      }));
    });
    return unsub;
  }, []);

  const markAsRead = async (id: string) => {
    await updateDoc(doc(db, "notifications", id), { read: true });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <span role="img" aria-label="bell">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 text-xs">{unreadCount}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-10 max-h-96 overflow-y-auto">
          <div className="p-2 font-bold border-b">Notifications</div>
          {notifications.length === 0 && <div className="p-2 text-gray-500">No notifications</div>}
          {notifications.map(n => (
            <div key={n.id} className={`p-2 border-b ${!n.read ? 'bg-blue-50' : ''}`}
              onClick={() => markAsRead(n.id)}
              style={{ cursor: 'pointer' }}
            >
              {n.text}
              <div className="text-xs text-gray-400">{n.createdAt?.toDate?.().toLocaleString?.() || ''}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 