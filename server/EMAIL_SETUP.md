# Email Verification Setup Guide

## Overview
The Campus Social Hub now includes a functional email verification system that sends verification requests to the housing office when students or faculty register.

## Setup Instructions

### 1. Email Configuration
Create a `.env` file in the server directory with the following variables:

```env
EMAIL_USER=hocking.social.hub@gmail.com
EMAIL_PASS=your-app-password-here
FRONTEND_URL=http://localhost:5173
```

### 2. Gmail Setup
To use Gmail for sending emails:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in the EMAIL_PASS variable

### 3. Testing the System

1. **Start the server**:
   ```bash
   cd server
   npm run dev
   ```

2. **Start the client**:
   ```bash
   cd client
   npm run dev
   ```

3. **Test Registration**:
   - Go to `/housing/social`
   - Fill out the registration form
   - Submit for verification

4. **Check Email**:
   - The housing office will receive a verification email at `housing@hocking.edu`
   - Click the "APPROVE USER" or "REJECT USER" buttons in the email

### 4. How It Works

1. **User Registration**: When a user registers, the system:
   - Validates the user data
   - Sends a verification email to housing@hocking.edu
   - Stores the verification request in memory

2. **Email Verification**: The housing office receives an email with:
   - Complete user information
   - Approve/Reject buttons
   - Direct links to the verification page

3. **User Notification**: After verification:
   - The user receives an email notification
   - Their account status is updated
   - They can access the Campus Social Hub

### 5. API Endpoints

- `POST /api/verification/register` - Register a new user
- `POST /api/verification/verify` - Approve/reject a user
- `GET /api/verification/status/:id` - Get verification status
- `GET /api/verification/pending` - Get all pending verifications

### 6. Security Notes

- In production, use a proper database instead of in-memory storage
- Implement proper authentication for admin functions
- Use environment variables for all sensitive data
- Consider rate limiting for registration requests

### 7. Troubleshooting

**Email not sending**:
- Check Gmail credentials
- Ensure 2FA is enabled and app password is correct
- Check server logs for error messages

**Verification links not working**:
- Ensure FRONTEND_URL is set correctly
- Check that the server is running on port 3000
- Verify the client is running on port 5173

**User not getting verified**:
- Check that the verification email was sent
- Ensure the housing office clicked the correct button
- Check server logs for verification status 