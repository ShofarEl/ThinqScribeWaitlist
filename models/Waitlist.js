import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: {
      values: ['student', 'educator', 'professional', 'researcher', 'other'],
      message: '{VALUE} is not a valid status'
    },
    default: 'student'
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add index for email for faster queries
waitlistSchema.index({ email: 1 });

// Add index for status for filtering
waitlistSchema.index({ status: 1 });

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

export default Waitlist; 