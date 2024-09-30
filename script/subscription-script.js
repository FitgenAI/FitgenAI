// subscription-script.js

// Function to initiate the subscription process
async function initiateSubscription() {
    try {
        // Step 1: Make a POST request to your backend to create a subscription
        const response = await fetch('http://localhost:3000/create-subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const subscriptionData = await response.json();

        if (subscriptionData && subscriptionData.id) {
            // Step 2: If subscription is created successfully, trigger Razorpay checkout
            openRazorpayCheckout(subscriptionData.id);
        } else {
            console.error('Failed to create subscription');
        }
    } catch (error) {
        console.error('Error during subscription creation:', error);
    }
}

// Step 3: Function to open Razorpay Checkout
function openRazorpayCheckout(subscriptionId) {
    var options = {
        key: "YOUR_RAZORPAY_KEY_ID",  // Replace with your Razorpay Key ID
        subscription_id: subscriptionId, // The subscription ID from the backend
        name: "FitgenAI",
        description: "₹1 Monthly Subscription",
        handler: function (response) {
            // Step 4: Handle the success response from Razorpay and verify the payment
            alert("Payment Successful! Subscription ID: " + response.razorpay_subscription_id);
            verifyPayment(response);  // Optionally verify the payment
        },
        theme: {
            color: "#3399cc"
        }
    };

    var rzp = new Razorpay(options);
    rzp.open();
}

// Optional Step 5: Function to verify the payment
async function verifyPayment(paymentData) {
    try {
        const response = await fetch('http://localhost:3000/verify-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });

        const verificationResult = await response.text();
        console.log('Payment Verification:', verificationResult);
    } catch (error) {
        console.error('Error during payment verification:', error);
    }
}
