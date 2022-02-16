const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
  console.log("HERE payment", req.body.tokenId);
  stripe.charges.create(
    {
      // apiKey:"sk_test_51KTR06SENUThnzGeptMtxSu3gVXftp5PqlfJKJqPh86HWIkSr0ST0rHpFrvFzvNqdjhjn83zFZZW1oBr0DpHbT3O00ED6W0GtG",
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
        console.log("HERE stripeErr");
      } else {
        console.log("HERE stripeRES");
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
