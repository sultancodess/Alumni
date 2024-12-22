import express from 'express';
import Donation from '../models/Donation.js'; // Import the Donation model
import { processPayment } from '../controllers/paymentController.js';

const router = express.Router();

// POST route for donation processing
router.post('/donations', processPayment);

// GET route to fetch all donations
router.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching donations', error: err.message });
  }
});

// GET route to fetch a single donation by ID
router.get('/donations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching donation', error: err.message });
  }
});

export default router;
