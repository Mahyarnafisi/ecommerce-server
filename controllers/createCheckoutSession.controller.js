import dotenv from "dotenv";
dotenv.config();

import stripe from "stripe";
const stripeAuth = stripe(process.env.SECRET_STRIPE_KEY);

export const createCheckoutSession = async (req, res) => {
  const products = req.body;
  const lineItems = products.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    };
  });

  const session = await stripeAuth.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://ecommerce-client-mocha.vercel.app/wishlist",
    cancel_url: "https://ecommerce-client-mocha.vercel.app/checkout",
  });

  res.json({ id: session.id });
};
