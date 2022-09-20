const functions = require("firebase-functions");

exports.createStripeCheckout = functions.https.onCall(async (data, context)=>{
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 3000,
    currency: "gbp",
    automatic_payment_methods: {enabled: true},
    receipt_email: "jubeennp@gmail.com",
  });
  return ({client_secret: paymentIntent.client_secret});
});
