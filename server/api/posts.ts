import express from 'express';
import { submitPostForVerification, verifyPost, getPostStatus, getAllPendingPosts, getApprovedPosts } from '../services/postVerificationService';

const router = express.Router();

// Submit a new post for verification
router.post('/submit', async (req, res) => {
  try {
    const {
      type,
      content,
      author,
      category,
      hashtags,
      emoji,
      pollOptions,
      eventDetails,
      image,
      video
    } = req.body;

    // Validate required fields
    if (!type || !content || !author || !category) {
      return res.status(400).json({
        success: false,
        message: 'Type, content, author, and category are required'
      });
    }

    // Validate post type
    const validTypes = ['text', 'image', 'video', 'poll', 'event', 'alert'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post type'
      });
    }

    // Validate author data
    if (!author.firstName || !author.lastName || !author.email || !author.userType) {
      return res.status(400).json({
        success: false,
        message: 'Author information is incomplete'
      });
    }

    const postData = {
      type,
      content,
      author,
      category,
      hashtags: hashtags || [],
      emoji,
      pollOptions,
      eventDetails,
      image,
      video
    };

    // Submit post for verification
    const postId = await submitPostForVerification(postData);

    res.json({
      success: true,
      message: 'Post submitted for verification. You will be notified once it is reviewed.',
      postId
    });

  } catch (error) {
    console.error('Error in post submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit post. Please try again.'
    });
  }
});

// Verify a post (approve/reject)
router.post('/verify', async (req, res) => {
  try {
    const { postId, action, reviewedBy, rejectionReason } = req.body;

    if (!postId || !action || !reviewedBy) {
      return res.status(400).json({
        success: false,
        message: 'Post ID, action, and reviewed by are required'
      });
    }

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Must be "approve" or "reject"'
      });
    }

    const result = await verifyPost(postId, action, reviewedBy, rejectionReason);

    res.json({
      success: true,
      message: `Post ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      post: result
    });

  } catch (error) {
    console.error('Error in post verification:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to process verification'
    });
  }
});

// Get post status
router.get('/status/:postId', (req, res) => {
  try {
    const { postId } = req.params;
    const status = getPostStatus(postId);

    if (!status) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      post: status
    });

  } catch (error) {
    console.error('Error getting post status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get post status'
    });
  }
});

// Get all pending posts (for admin dashboard)
router.get('/pending', (req, res) => {
  try {
    const pendingPosts = getAllPendingPosts();

    res.json({
      success: true,
      posts: pendingPosts
    });

  } catch (error) {
    console.error('Error getting pending posts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get pending posts'
    });
  }
});

// Get all approved posts (for the feed)
router.get('/approved', (req, res) => {
  try {
    const approvedPosts = getApprovedPosts();

    res.json({
      success: true,
      posts: approvedPosts
    });

  } catch (error) {
    console.error('Error getting approved posts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get approved posts'
    });
  }
});

export default router; 