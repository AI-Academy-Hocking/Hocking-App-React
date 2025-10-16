import { useState } from "react";

interface Notification {
  id: string;
  text: string;
  read: boolean;
  createdAt?: { toDate?: () => Date };
}

export default function SocialNotifications() {
  const [notifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  // Firebase integration disabled - component ready for future implementation
  
  const markAsRead = async (id: string) => {
    // Firebase integration will be implemented here
    console.log('Mark as read:', id);
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
