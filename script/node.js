// server.js (Backend code)

const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Razorpay configuration
const razorpayInstance = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
    key_secret: 'YOUR_RAZORPAY_SECRET_KEY' // Replace with your Razorpay Secret Key
});

// Create order endpoint
app.post('/create-order', async (req, res) => {
    try {
        const options = {
            amount: 100, // Amount in paise (₹1 = 100 paise)
            currency: "INR",
            receipt: "receipt#1", // Unique receipt number
            payment_capture: 1 // Auto-capture the payment
        };

        const order = await razorpayInstance.orders.create(options);

        // Send the order details back to the frontend
        res.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error in creating order");
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
