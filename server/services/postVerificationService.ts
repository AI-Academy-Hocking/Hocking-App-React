import nodemailer from 'nodemailer';

interface PostSubmission {
  id: string;
  type: 'text' | 'image' | 'video' | 'poll' | 'event' | 'alert';
  content: string;
  author: {
    firstName: string;
    lastName: string;
    email: string;
    userType: 'student' | 'faculty';
  };
  category: string;
  hashtags: string[];
  emoji?: string;
  pollOptions?: string[];
  eventDetails?: {
    date: string;
    time: string;
    location: string;
    description: string;
  };
  image?: string;
  video?: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
}

// In-memory storage for post submissions (in production, use a database)
const postSubmissions = new Map<string, PostSubmission>();

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'hocking.social.hub@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

export const submitPostForVerification = async (postData: Omit<PostSubmission, 'id' | 'submittedAt' | 'status'>): Promise<string> => {
  const postId = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const postSubmission: PostSubmission = {
    ...postData,
    id: postId,
    submittedAt: new Date(),
    status: 'pending'
  };
  
  postSubmissions.set(postId, postSubmission);

  const transporter = createTransporter();
  
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-post/${postId}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'hocking.social.hub@gmail.com',
    to: 'housing@hocking.edu',
    subject: 'Campus Social Hub - New Post Approval Request',
    html: generatePostVerificationEmail(postSubmission, verificationUrl)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Post verification email sent for post: ${postId}`);
    return postId;
  } catch (error) {
    console.error('Error sending post verification email:', error);
    throw new Error('Failed to send post verification email');
  }
};

const generatePostVerificationEmail = (post: PostSubmission, verificationUrl: string): string => {
  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return '📝';
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'poll': return '📊';
      case 'event': return '📅';
      case 'alert': return '🚨';
      default: return '📄';
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'alert': return '#dc3545';
      case 'event': return '#28a745';
      case 'poll': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Campus Social Hub</h1>
        <p style="margin: 10px 0 0 0;">New Post Approval Request</p>
      </div>
      
      <div style="padding: 20px; background: #f9f9f9;">
        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <div style="background: ${getPostTypeColor(post.type)}; color: white; padding: 8px 12px; border-radius: 20px; margin-right: 10px;">
              ${getPostTypeIcon(post.type)} ${post.type.toUpperCase()}
            </div>
            <div>
              <strong>${post.author.firstName} ${post.author.lastName}</strong>
              <div style="font-size: 12px; color: #666;">${post.author.userType} • ${post.submittedAt.toLocaleString()}</div>
            </div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Post Content:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid ${getPostTypeColor(post.type)};">
              <p style="margin: 0; line-height: 1.6;">${post.content}</p>
              ${post.emoji ? `<div style="font-size: 24px; margin-top: 10px;">${post.emoji}</div>` : ''}
            </div>
          </div>
          
          ${post.pollOptions ? `
            <div style="margin-bottom: 15px;">
              <h4 style="margin: 0 0 10px 0; color: #333;">Poll Options:</h4>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
                ${post.pollOptions.map((option, index) => `
                  <div style="margin-bottom: 5px;">${index + 1}. ${option}</div>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${post.eventDetails ? `
            <div style="margin-bottom: 15px;">
              <h4 style="margin: 0 0 10px 0; color: #333;">Event Details:</h4>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
                <div><strong>Date:</strong> ${post.eventDetails.date}</div>
                <div><strong>Time:</strong> ${post.eventDetails.time}</div>
                <div><strong>Location:</strong> ${post.eventDetails.location}</div>
                <div><strong>Description:</strong> ${post.eventDetails.description}</div>
              </div>
            </div>
          ` : ''}
          
          ${post.hashtags.length > 0 ? `
            <div style="margin-bottom: 15px;">
              <h4 style="margin: 0 0 10px 0; color: #333;">Hashtags:</h4>
              <div>
                ${post.hashtags.map(tag => `
                  <span style="background: #e9ecef; color: #495057; padding: 4px 8px; border-radius: 12px; margin-right: 5px; font-size: 12px;">${tag}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>Important:</strong> Please review this post content and click one of the buttons below to approve or reject the publication.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}?action=approve&id=${post.id}" 
             style="background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-right: 10px; display: inline-block;">
            ✅ APPROVE POST
          </a>
          <a href="${verificationUrl}?action=reject&id=${post.id}" 
             style="background: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            ❌ REJECT POST
          </a>
        </div>
        
        <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p style="margin: 0; color: #6c757d; font-size: 14px;">
            <strong>Post ID:</strong> ${post.id}<br>
            <strong>Category:</strong> ${post.category}<br>
            <strong>Submitted:</strong> ${post.submittedAt.toLocaleString()}<br>
            <strong>Note:</strong> All posts must be approved before appearing in the Campus Social Hub.
          </p>
        </div>
      </div>
      
      <div style="background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">Hocking College Campus Social Hub - Content Moderation System</p>
      </div>
    </div>
  `;
};

export const verifyPost = async (postId: string, action: 'approve' | 'reject', reviewedBy: string, rejectionReason?: string): Promise<PostSubmission> => {
  const post = postSubmissions.get(postId);
  
  if (!post) {
    throw new Error('Post submission not found');
  }
  
  if (post.status !== 'pending') {
    throw new Error('Post submission already processed');
  }
  
  // Update the post status
  post.status = action === 'approve' ? 'approved' : 'rejected';
  post.reviewedAt = new Date();
  post.reviewedBy = reviewedBy;
  if (action === 'reject' && rejectionReason) {
    post.rejectionReason = rejectionReason;
  }
  
  postSubmissions.set(postId, post);
  
  // Send notification to the author
  await sendPostNotification(post);
  
  // Send notification to all users about new post (if approved)
  if (post.status === 'approved') {
    await sendNewPostNotification(post);
  }
  
  return post;
};

const sendPostNotification = async (post: PostSubmission) => {
  const transporter = createTransporter();
  
  const status = post.status === 'approved' ? 'APPROVED' : 'REJECTED';
  const statusColor = post.status === 'approved' ? '#28a745' : '#dc3545';
  const statusIcon = post.status === 'approved' ? '✅' : '❌';
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'hocking.social.hub@gmail.com',
    to: post.author.email,
    subject: `Campus Social Hub - Post ${status}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Campus Social Hub</h1>
          <p style="margin: 10px 0 0 0;">Post ${status}</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <div style="text-align: center; margin: 30px 0;">
            <div style="font-size: 48px; margin-bottom: 20px;">${statusIcon}</div>
            <h2 style="color: ${statusColor}; margin: 0;">Your post has been ${status.toLowerCase()}!</h2>
          </div>
          
          <div style="background: ${post.status === 'approved' ? '#d4edda' : '#f8d7da'}; border: 1px solid ${post.status === 'approved' ? '#c3e6cb' : '#f5c6cb'}; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: ${post.status === 'approved' ? '#155724' : '#721c24'};">
              ${post.status === 'approved' 
                ? 'Your post has been approved and is now live on the Campus Social Hub!' 
                : `Your post has been rejected.${post.rejectionReason ? ` Reason: ${post.rejectionReason}` : ''}`}
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px 0;">Post Details:</h4>
            <p style="margin: 0;"><strong>Content:</strong> ${post.content.substring(0, 100)}${post.content.length > 100 ? '...' : ''}</p>
            <p style="margin: 5px 0 0 0;"><strong>Type:</strong> ${post.type}</p>
            <p style="margin: 5px 0 0 0;"><strong>Category:</strong> ${post.category}</p>
          </div>
          
          ${post.status === 'approved' ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/housing/social" 
                 style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                🚀 View Your Post
              </a>
            </div>
          ` : ''}
          
          <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #6c757d; font-size: 14px;">
              <strong>Reviewed by:</strong> ${post.reviewedBy}<br>
              <strong>Reviewed on:</strong> ${post.reviewedAt?.toLocaleString()}<br>
              <strong>Post ID:</strong> ${post.id}
            </p>
          </div>
        </div>
        
        <div style="background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Hocking College Campus Social Hub - Content Moderation System</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Post notification sent to author: ${post.author.email}`);
  } catch (error) {
    console.error('Error sending post notification:', error);
  }
};

const sendNewPostNotification = async (post: PostSubmission) => {
  // In a real implementation, this would send notifications to all verified users
  // For now, we'll just log that a new post was approved
  console.log(`New post approved: ${post.content.substring(0, 50)}... by ${post.author.firstName} ${post.author.lastName}`);
  
  // This would typically:
  // 1. Get all verified users from the database
  // 2. Send push notifications to their devices
  // 3. Update notification counters
  // 4. Send email notifications if configured
  
  // For demonstration, we'll simulate sending to a list of users
  const verifiedUsers = [
    'student1@hocking.edu',
    'student2@hocking.edu',
    'faculty1@hocking.edu'
  ];
  
  const transporter = createTransporter();
  
  for (const userEmail of verifiedUsers) {
    if (userEmail === post.author.email) continue; // Skip the author
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'hocking.social.hub@gmail.com',
      to: userEmail,
      subject: '📝 New Post on Campus Social Hub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Campus Social Hub</h1>
            <p style="margin: 10px 0 0 0;">New Post Available</p>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <div style="text-align: center; margin: 20px 0;">
              <div style="font-size: 48px; margin-bottom: 20px;">📝</div>
              <h2 style="color: #333; margin: 0;">New ${post.type.charAt(0).toUpperCase() + post.type.slice(1)} Post</h2>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #007bff;">
              <p style="margin: 0; line-height: 1.6;"><strong>${post.author.firstName} ${post.author.lastName}</strong> posted:</p>
              <p style="margin: 10px 0 0 0; color: #666;">${post.content}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/housing/social" 
                 style="background: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                🚀 View Post
              </a>
            </div>
            
            <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                <strong>Category:</strong> ${post.category}<br>
                <strong>Posted:</strong> ${post.reviewedAt?.toLocaleString()}<br>
                <strong>Type:</strong> ${post.type}
              </p>
            </div>
          </div>
          
          <div style="background: #343a40; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">Hocking College Campus Social Hub - Notification System</p>
          </div>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`New post notification sent to: ${userEmail}`);
    } catch (error) {
      console.error(`Error sending new post notification to ${userEmail}:`, error);
    }
  }
};

export const getPostStatus = (postId: string): PostSubmission | null => {
  return postSubmissions.get(postId) || null;
};

export const getAllPendingPosts = (): PostSubmission[] => {
  return Array.from(postSubmissions.values()).filter(post => post.status === 'pending');
};

export const getApprovedPosts = (): PostSubmission[] => {
  return Array.from(postSubmissions.values()).filter(post => post.status === 'approved');
}; 