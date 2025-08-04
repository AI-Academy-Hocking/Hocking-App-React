# 🚀 Campus Social Hub - Demo Setup Guide

## Quick Start for Testing & Demo

### How to Access the Campus Social Hub Without Registration

1. **Navigate to the Social Hub**
   - Go to: `http://localhost:5173/housing/social`
   - Or navigate through the app: Housing → Social

2. **Enable Demo Mode**
   - On the registration screen, scroll down to find the **"🚀 Try Demo Mode"** button
   - Click the button to instantly access all features
   - No registration or verification required!

3. **Demo Features Available**
   - ✅ View sample posts (text, events, polls, alerts)
   - ✅ Like, comment, and interact with posts
   - ✅ Create new posts (all types: text, image, video, poll, event)
   - ✅ Use hashtags and emojis
   - ✅ Filter posts by category
   - ✅ Test notifications system
   - ✅ Explore the full UI/UX

### Demo User Details
- **Name:** Demo Student
- **Email:** demo@hocking.edu
- **Building:** North Hall
- **Room:** 101
- **Program:** Computer Science

### Sample Content Included
The demo mode includes realistic sample posts:
- 📝 Text posts with hashtags
- 📅 Event posts (study groups, movie nights)
- 📊 Poll posts with voting
- ⚠️ Alert posts (maintenance notices)
- 🏠 Housing-related posts

### For Your Team Demo

1. **Start the Application**
   ```bash
   # Terminal 1 - Start the server
   cd server
   npm run dev
   
   # Terminal 2 - Start the client
   cd client
   npm run dev
   ```

2. **Demo Flow**
   - Show the registration form
   - Click "🚀 Try Demo Mode" 
   - Demonstrate all social features
   - Show the notification system
   - Create a new post to show the full workflow

3. **Key Features to Highlight**
   - **Content Moderation:** All posts go through verification
   - **User Verification:** Email-based approval system
   - **Real-time Features:** Notifications, likes, comments
   - **Mobile-First Design:** Responsive across all devices
   - **Accessibility:** Full keyboard navigation support

### Demo Mode Indicator
When in demo mode, you'll see a green "🚀 Demo Mode" badge next to the user type in the header.

### Exiting Demo Mode
- Click "Logout" to return to the registration screen
- Demo data is stored locally and will persist until logout

---

## 🎯 Perfect for:
- **Team Presentations** - Show the full feature set instantly
- **User Testing** - Let stakeholders explore without setup
- **Development Testing** - Quick access to test new features
- **Client Demos** - Professional demonstration of capabilities

## 🔧 Technical Notes
- Demo mode uses local storage for persistence
- Sample data is realistic and showcases all post types
- All features work exactly as they would for real users
- No server-side verification bypasses (maintains security model)

---

**Ready to demo? Just click "🚀 Try Demo Mode" and start exploring!** 