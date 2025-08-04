import express from 'express';
import { sendVerificationEmail, verifyUser, getVerificationStatus, getAllPendingVerifications } from '../services/emailService';

const router = express.Router();

// Register a new user and send verification email
router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      studentId,
      email,
      userType,
      dormBuilding,
      roomNumber,
      program,
      username
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !studentId || !email || !userType || !dormBuilding || !roomNumber || !program || !username) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate user type
    if (!['student', 'faculty'].includes(userType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user type'
      });
    }

    const userData = {
      firstName,
      lastName,
      studentId,
      email,
      userType,
      dormBuilding,
      roomNumber,
      program,
      username
    };

    // Send verification email
    const requestId = await sendVerificationEmail(userData);

    res.json({
      success: true,
      message: 'Registration submitted successfully. Verification email sent to housing office.',
      requestId
    });

  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process registration. Please try again.'
    });
  }
});

// Verify a user (approve/reject)
router.post('/verify', async (req, res) => {
  try {
    const { requestId, action, verifiedBy } = req.body;

    if (!requestId || !action || !verifiedBy) {
      return res.status(400).json({
        success: false,
        message: 'Request ID, action, and verified by are required'
      });
    }

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Must be "approve" or "reject"'
      });
    }

    const result = await verifyUser(requestId, action, verifiedBy);

    res.json({
      success: true,
      message: `User ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      verification: result
    });

  } catch (error) {
    console.error('Error in user verification:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to process verification'
    });
  }
});

// Get verification status
router.get('/status/:requestId', (req, res) => {
  try {
    const { requestId } = req.params;
    const status = getVerificationStatus(requestId);

    if (!status) {
      return res.status(404).json({
        success: false,
        message: 'Verification request not found'
      });
    }

    res.json({
      success: true,
      verification: status
    });

  } catch (error) {
    console.error('Error getting verification status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get verification status'
    });
  }
});

// Get all pending verifications (for admin dashboard)
router.get('/pending', (req, res) => {
  try {
    const pendingVerifications = getAllPendingVerifications();

    res.json({
      success: true,
      verifications: pendingVerifications
    });

  } catch (error) {
    console.error('Error getting pending verifications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get pending verifications'
    });
  }
});

export default router; 