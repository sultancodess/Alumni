import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donor: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },
  donationAmount: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
  payment: {
    paymentId: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'pending',
    },
  },
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
