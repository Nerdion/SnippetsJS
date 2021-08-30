const app = require("express")();
const shortid = require("shortid"); //for generating payment ids
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv")
dotenv.config()

app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
});

app.post("/afterPayment", (req, res) => {
    console.log(req.body);
    res.status(200);
});

app.post("/razorpay", async (req, res) => {
    const amount = 499;
    const currency = "INR";

    const options = {
        amount: amount * 100, //converting rupee to paisa
        currency,
        receipt: shortid.generate(),
    };

    //creating new order
    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
        return res.status(200).json({
            status: true,
            message: "Creating Order",
            id: response.id,
            currency: response.currency,
            amount: response.amount,
            name: "MINDSTONE ALGO TRADING",
            description: "Thanks for subscribing to our service",
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            status: false,
            message: error.message,
        });
    }
});

app.listen(8000, () => {
    console.log("Listening on 8000");
});
