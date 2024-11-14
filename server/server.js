require('dotenv').config();

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("client"));

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Card payment only
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: 'Payment', // Generic name
              },
              unit_amount: 15000, // Set amount
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.SERVER_URL}/success.html`,
        cancel_url: `${process.env.SERVER_URL}/cancel.html`,
      });
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
