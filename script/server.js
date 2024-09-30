const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(bodyParser.json()); // Parse JSON body

// Razorpay configuration
const razorpayInstance = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID',         // Replace with your Razorpay Key ID
    key_secret: 'YOUR_RAZORPAY_SECRET_KEY'  // Replace with your Razorpay Secret Key
});

// Create a subscription endpoint
app.post('/create-subscription', async (req, res) => {
    try {
        // Create a new subscription with ₹1 recurring payment
        const subscriptionOptions = {
            plan_id: 'YOUR_PLAN_ID',  // Replace with your Plan ID
            total_count: 12,          // Number of times the subscription will charge (monthly)
            customer_notify: 1,       // Notify customer on creation of subscription
            quantity: 1               // The number of subscriptions
        };

        const subscription = await razorpayInstance.subscriptions.create(subscriptionOptions);

        // Send the subscription details to the frontend
        res.json({
            id: subscription.id,
            status: subscription.status
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error in creating subscription");
    }
});

// Payment verification webhook (optional)
app.post('/verify-payment', (req, res) => {
    // You can implement Razorpay webhook events to handle payment success/failure.
    const { razorpay_subscription_id, razorpay_signature } = req.body;

    // Verify the signature (You can verify the signature using Razorpay's node SDK methods)
    try {
        const isValid = razorpayInstance.utils.verifyPaymentSignature({
            subscription_id: razorpay_subscription_id,
            signature: razorpay_signature
        });

        if (isValid) {
            // Handle successful payment
            res.status(200).send("Payment verified successfully");
        } else {
            res.status(400).send("Invalid Payment Signature");
        }
    } catch (error) {
        res.status(500).send("Error in verifying payment");
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});