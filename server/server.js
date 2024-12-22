import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import authRoutes from "./routes/authRoutes.js"; // Importing the auth routes
import paymentRoutes from './routes/paymentRoutes.js'; // Importing the payment routes
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/Users.js'; // Corrected path to the Users model

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes); // Using the auth routes for handling register, login, and logout
app.use("/api/payments", paymentRoutes); // Using the payment routes for handling payment actions

app.get('/', (req, res) => res.send("API is working"));

// Start the server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
