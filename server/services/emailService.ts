import nodemailer from 'nodemailer';

interface UserRegistration {
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  userType: 'student' | 'faculty';
  dormBuilding: string;
  roomNumber: string;
  program: string;
  username: string;
}

interface VerificationRequest {
  id: string;
  user: UserRegistration;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  verifiedAt?: Date;
  verifiedBy?: string;
}

// In-memory storage for verification requests (in production, use a database)
const verificationRequests = new Map<string, VerificationRequest>();

// Create transporter for sending emails
const createTransporter = () => {
  // For development, we'll use a test account
  // In production, configure with real SMTP settings
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'hocking.social.hub@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

export const sendVerificationEmail = async (user: UserRegistration): Promise<string> => {
  const requestId = `verification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Store the verification request
  const verificationRequest: VerificationRequest = {
    id: requestId,
    user,
    status: 'pending',
    createdAt: new Date()
  };
  
  verificationRequests.set(requestId, verificationRequest);

  const transporter = createTransporter();
  
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-user/${requestId}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'hocking.social.hub@gmail.com',
    to: 'housing@hocking.edu',
    subject: 'Campus Social Hub - New User Verification Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Campus Social Hub</h1>
          <p style="margin: 10px 0 0 0;">New User Verification Request</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333;">User Registration Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #fff;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${user.firstName} ${user.lastName}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Student ID:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${user.studentId}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${user.email}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">User Type:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${user.userType}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Dorm:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${user.dormBuilding} Room ${user.roomNumber}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Program:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${user.program}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Username:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${user.username}</td>
            </tr>
          </table>
          
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>Important:</strong> Please verify this user's information and click one of the buttons below to approve or reject their registration.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}?action=approve&id=${requestId}" 
               style="background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-right: 10px; display: inline-block;">
              ✅ APPROVE USER
            </a>
            <a href="${verificationUrl}?action=reject&id=${requestId}" 
               style="background: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              ❌ REJECT USER
            </a>
          </div>
          
          <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              <strong>Verification ID:</strong> ${requestId}<br>
              <strong>Requested:</strong> ${new Date().toLocaleString()}<br>
              <strong>Note:</strong> Only verified students and faculty should be granted access to the Campus Social Hub.
            </p>
          </div>
        </div>
        
        <div style="background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Hocking College Campus Social Hub - Automated Verification System</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent for user: ${user.email}`);
    return requestId;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

export const verifyUser = async (requestId: string, action: 'approve' | 'reject', verifiedBy: string): Promise<VerificationRequest> => {
  const request = verificationRequests.get(requestId);
  
  if (!request) {
    throw new Error('Verification request not found');
  }
  
  if (request.status !== 'pending') {
    throw new Error('Verification request already processed');
  }
  
  // Update the verification status
  request.status = action === 'approve' ? 'approved' : 'rejected';
  request.verifiedAt = new Date();
  request.verifiedBy = verifiedBy;
  
  verificationRequests.set(requestId, request);
  
  // Send notification email to the user
  await sendUserNotification(request);
  
  return request;
};

const sendUserNotification = async (request: VerificationRequest) => {
  const transporter = createTransporter();
  
  const status = request.status === 'approved' ? 'APPROVED' : 'REJECTED';
  const statusColor = request.status === 'approved' ? '#28a745' : '#dc3545';
  const statusIcon = request.status === 'approved' ? '✅' : '❌';
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'hocking.social.hub@gmail.com',
    to: request.user.email,
    subject: `Campus Social Hub - Account ${status}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Campus Social Hub</h1>
          <p style="margin: 10px 0 0 0;">Account Verification ${status}</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <div style="text-align: center; margin: 30px 0;">
            <div style="font-size: 48px; margin-bottom: 20px;">${statusIcon}</div>
            <h2 style="color: ${statusColor}; margin: 0;">Your account has been ${status.toLowerCase()}!</h2>
          </div>
          
          <div style="background: ${request.status === 'approved' ? '#d4edda' : '#f8d7da'}; border: 1px solid ${request.status === 'approved' ? '#c3e6cb' : '#f5c6cb'}; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: ${request.status === 'approved' ? '#155724' : '#721c24'};">
              ${request.status === 'approved' 
                ? 'Congratulations! Your Campus Social Hub account has been approved. You can now access all features of the platform.' 
                : 'We regret to inform you that your Campus Social Hub account has been rejected. Please contact the housing office for more information.'}
            </p>
          </div>
          
          ${request.status === 'approved' ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/housing/social" 
                 style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                🚀 Access Campus Social Hub
              </a>
            </div>
          ` : ''}
          
          <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              <strong>Verified by:</strong> ${request.verifiedBy}<br>
              <strong>Verified on:</strong> ${request.verifiedAt?.toLocaleString()}<br>
              <strong>Verification ID:</strong> ${request.id}
            </p>
          </div>
        </div>
        
        <div style="background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Hocking College Campus Social Hub - Automated Notification System</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to user: ${request.user.email}`);
  } catch (error) {
    console.error('Error sending user notification:', error);
  }
};

export const getVerificationStatus = (requestId: string): VerificationRequest | null => {
  return verificationRequests.get(requestId) || null;
};

export const getAllPendingVerifications = (): VerificationRequest[] => {
  return Array.from(verificationRequests.values()).filter(req => req.status === 'pending');
}; 