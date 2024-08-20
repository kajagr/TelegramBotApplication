const express = require("express")
const cors = require("cors")
const stripe = require("stripe")("sk_test_51PmCTtIfQEBOdjOk9HCcMtdWf244tgcV78TlYUIAllkRocotymRdYO9wHINqtzp7Mu6vcjFFAhiFRZUDOFBuxDbW008tZJ6yHl")
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Create a Checkout Session
app.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title, // Replace with actual product name
        },
        unit_amount: product.price * 100, // Stripe expects amount in cents
      },
      quantity: product.quantity,
    }
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
  })

  res.json({ id: session.id });
})

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
