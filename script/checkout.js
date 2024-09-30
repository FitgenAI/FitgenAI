// checkout.js

// Function to initiate Razorpay Checkout
async function openCheckout(orderId) {
  const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Enter the Key ID generated from Razorpay Dashboard
      amount: 100, // Amount in paise (₹1 = 100 paise)
      currency: "INR",
      name: "FitgenAI",
      description: "₹1 Subscription",
      image: "https://example.com/logo.png", // Optional: Add your logo URL here
      order_id: orderId, // Pass the order ID received from backend

      handler: function (response) {
          // Step 3: Handle the success response from Razorpay (payment successful)
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          console.log(response);  // Response will contain payment details

          // Optional: Verify payment on your backend
          verifyPayment(response);
      },
      
      prefill: {
          name: "Ahsanat Parween",  // Optional: Prefill user info
          email: "example@example.com", // Prefill email (optional)
          contact: "9999999999" // Prefill phone number (optional)
      },
      
      theme: {
          color: "#3399cc" // Customize the color of the payment form
      }
  };

  const rzp1 = new Razorpay(options);
  rzp1.open();
}

// Function to trigger the checkout process (could be attached to a button click)
async function initiateCheckout() {
  try {
      // Step 1: Fetch the order ID from the backend
      const response = await fetch('http://localhost:3000/create-order', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      const orderData = await response.json();
      if (orderData && orderData.id) {
          // Step 2: Open Razorpay checkout with the order ID
          openCheckout(orderData.id);
      } else {
          console.error('Failed to create order');
      }
  } catch (error) {
      console.error('Error during order creation:', error);
  }
}

// Optional: Function to verify payment with your backend
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
