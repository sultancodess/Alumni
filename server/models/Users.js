import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Email validation
        },
        message: 'Please provide a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['student', 'alumni', 'admin'],
      required: true,
    },
    studentDetails: {
      enrollmentYear: { type: Number },
      department: { type: String },
      currentStatus: { type: String, enum: ['Active', 'Graduated', 'Dropped'] },
      location: { city: String, country: String },
    },
    alumniDetails: {
      graduationYear: { type: Number },
      department: { type: String },
      currentPosition: { title: String, company: String },
      location: { city: String, country: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
