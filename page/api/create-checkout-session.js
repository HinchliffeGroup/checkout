const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const items = [];

  // 🔵 Core Services
  const mainService = req.body.get('main_service'); // dropdown input from Webflow

  if (mainService === 'rams_cpp') {
    items.push({ price: 'price_1RTMbAQuLUKoFHltouHciPKT', quantity: 1 });
  } else if (mainService === 'face_fit_testing') {
    items.push({ price: 'price_1RTPIIQuLUKoFHlt8Yx7wtlm', quantity: 1 });
  } else if (mainService === 'essentials_elite') {
    items.push({ price: 'price_1RTXKBQuLUKoFHltNjhDBq5l', quantity: 1 });
  } else if (mainService === 'essentials_plus') {
    items.push({ price: 'price_1RTXIBQuLUKoFHltTjayJlJ6', quantity: 1 });
  } else if (mainService === 'site_safety_pack') {
    items.push({ price: 'price_1RTPYNQuLUKoFHltc6MA3tlH', quantity: 1 });
  }

  // 🟡 Add-ons (checkboxes)
  if (req.body.get('hse_report') === 'yes') {
    items.push({ price: 'price_1RakGjQuLUKoFHltal82DFQ1', quantity: 1 });
  }
  if (req.body.get('branding') === 'yes') {
    items.push({ price: 'price_1RakFtQuLUKoFHlt7bHByfSt', quantity: 1 });
  }
  if (req.body.get('site_visit') === 'yes') {
    items.push({ price: 'price_1RakEdQuLUKoFHltPNqqafKi', quantity: 1 });
  }
  if (req.body.get('same_day') === 'yes') {
    items.push({ price: 'price_1RakD8QuLUKoFHlt6KuPiPe8', quantity: 1 });
  }
  if (req.body.get('express_48h') === 'yes') {
    items.push({ price: 'price_1RakBdQuLUKoFHltzkkX61Ot', quantity: 1 });
  }
  if (req.body.get('facefit_5') === 'yes') {
    items.push({ price: 'price_1RTXMmQuLUKoFHltbha7GKFd', quantity: 1 });
  }
  if (req.body.get('extra_facefit') === 'yes') {
    items.push({ price: 'price_1RTXLjQuLUKoFHltcmbLfV1B', quantity: 1 });
  }

  // 🧾 Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items,
    mode: 'payment',
    success_url: 'https://www.hinchliffegroup.com/success',
    cancel_url: 'https://www.hinchliffegroup.com/cancel',
  });

  res.redirect(303, session.url);
};
