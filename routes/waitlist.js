import express from 'express';
import Waitlist from '../models/Waitlist.js';
import { validateWaitlistEntry, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// @route   POST /api/waitlist
// @desc    Add new entry to waitlist
// @access  Public
router.post('/', validateWaitlistEntry, handleValidationErrors, async (req, res) => {
  try {
    const { firstName, lastName, email, status } = req.body;

    // Check if email already exists
    const existingEntry = await Waitlist.findOne({ email });
    if (existingEntry) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists in the waitlist'
      });
    }

    // Create new waitlist entry
    const waitlistEntry = new Waitlist({
      firstName,
      lastName,
      email,
      status
    });

    await waitlistEntry.save();

    res.status(201).json({
      success: true,
      message: 'Successfully added to waitlist!',
      data: {
        id: waitlistEntry._id,
        firstName: waitlistEntry.firstName,
        lastName: waitlistEntry.lastName,
        email: waitlistEntry.email,
        status: waitlistEntry.status,
        joinedAt: waitlistEntry.joinedAt
      }
    });

  } catch (error) {
    console.error('Error adding to waitlist:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/waitlist
// @desc    Get all waitlist entries
// @access  Public (you might want to add authentication later)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Build query object
    const query = { isActive: true };
    
    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === 'desc' ? -1 : 1;

    // Get total count for pagination
    const total = await Waitlist.countDocuments(query);

    // Get waitlist entries
    const waitlistEntries = await Waitlist.find(query)
      .select('-__v')
      .sort({ [sortBy]: sortOrder })
      .limit(parseInt(limit))
      .skip(skip);

    // Get status counts
    const statusCounts = await Waitlist.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: waitlistEntries,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalEntries: total,
        entriesPerPage: parseInt(limit)
      },
      statusCounts: statusCounts.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    });

  } catch (error) {
    console.error('Error fetching waitlist:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/waitlist/:id
// @desc    Get single waitlist entry
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const waitlistEntry = await Waitlist.findById(req.params.id).select('-__v');
    
    if (!waitlistEntry) {
      return res.status(404).json({
        success: false,
        message: 'Waitlist entry not found'
      });
    }

    res.json({
      success: true,
      data: waitlistEntry
    });

  } catch (error) {
    console.error('Error fetching waitlist entry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/waitlist/:id
// @desc    Update waitlist entry
// @access  Public (you might want to add authentication later)
router.put('/:id', validateWaitlistEntry, handleValidationErrors, async (req, res) => {
  try {
    const { firstName, lastName, email, status } = req.body;

    // Check if email already exists (excluding current entry)
    const existingEntry = await Waitlist.findOne({ 
      email, 
      _id: { $ne: req.params.id } 
    });
    
    if (existingEntry) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists in the waitlist'
      });
    }

    const waitlistEntry = await Waitlist.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, status },
      { new: true, runValidators: true }
    ).select('-__v');

    if (!waitlistEntry) {
      return res.status(404).json({
        success: false,
        message: 'Waitlist entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Waitlist entry updated successfully',
      data: waitlistEntry
    });

  } catch (error) {
    console.error('Error updating waitlist entry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   DELETE /api/waitlist/:id
// @desc    Delete waitlist entry (soft delete)
// @access  Public (you might want to add authentication later)
router.delete('/:id', async (req, res) => {
  try {
    const waitlistEntry = await Waitlist.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!waitlistEntry) {
      return res.status(404).json({
        success: false,
        message: 'Waitlist entry not found'
      });
    }

    res.json({
      success: true,
      message: 'Waitlist entry deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting waitlist entry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/waitlist/stats/overview
// @desc    Get waitlist statistics
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const totalEntries = await Waitlist.countDocuments({ isActive: true });
    
    const statusStats = await Waitlist.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const recentEntries = await Waitlist.find({ isActive: true })
      .select('firstName lastName joinedAt')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalEntries,
        statusBreakdown: statusStats.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        recentEntries
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;