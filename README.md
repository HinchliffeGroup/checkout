const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const items = [];

  // Core service (example: RAMS)
  items.push({
    price: 'price_rams_123', // Replace this with YOUR real Stripe Price ID
    quantity: 1,
  });

  // Add-ons based on form input
  if (req.body.get('express_delivery') === 'yes') {
    items.push({
      price: 'price_express_456', // Replace this too
      quantity: 1,
    });
  }

  if (req.body.get('face_fit') === 'yes') {
    items.push({
      price: 'price_facefit_789', // Replace this too
      quantity: 1,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: 'https://yourdomain.com/success',
      cancel_url: 'https://yourdomain.com/cancel',
      line_items: items,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
