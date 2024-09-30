from flask import Flask, render_template, request, jsonify
import razorpay
import json

app = Flask(__name__)

# Razorpay client setup
razorpay_client = razorpay.Client(auth=("YOUR_RAZORPAY_KEY_ID", "YOUR_RAZORPAY_SECRET"))

# Route for the subscription page
@app.route('/')
def index():
    return render_template('index.html')

# Route to create a payment order
@app.route('/create_order', methods=['POST'])
def create_order():
    # Create a Razorpay order for ₹1
    amount = 1 * 100  # ₹1 in paise
    payment_currency = 'INR'
    
    payment_capture = 1  # Auto-capture payments
    
    order = razorpay_client.order.create({
        'amount': amount,
        'currency': payment_currency,
        'payment_capture': payment_capture
    })

    return jsonify(order)

# Route to verify payment
@app.route('/verify_payment', methods=['POST'])
def verify_payment():
    data = request.get_json()
    order_id = data['order_id']
    payment_id = data['payment_id']
    signature = data['signature']

    try:
        # Verify payment signature
        razorpay_client.utility.verify_payment_signature({
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        })
        return jsonify({'status': 'success'})
    except:
        return jsonify({'status': 'failure'})

if __name__ == "__main__":
    app.run(debug=True)
