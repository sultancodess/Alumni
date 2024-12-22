import Donation from '../models/Donation.js';

export const processPayment = async (req, res) => {
  const { donorName, donorEmail, donorContact, donationAmount, message, paymentId, amountPaid, status } = req.body;

  try {
    // Create a new donation record
    const newDonation = new Donation({
      donor: {
        name: donorName,
        email: donorEmail,
        contact: donorContact,
      },
      donationAmount,
      message,
      payment: {
        paymentId,
        amountPaid,
        status,
      },
    });

    // Save the donation to the database
    await newDonation.save();

    // Respond with success
    res.status(200).json({ message: 'Donation processed successfully', donation: newDonation });
  } catch (err) {
    res.status(500).json({ message: 'Error processing donation', error: err.message });
  }
};
