const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
require('dotenv').config()
let cors = require('cors')

const stripe = require('stripe')(process.env.SECRET_KEY)

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()
let corsOptions = {
    origin: ['https://localhost:3000'],
}
app.use(cors())
router.post('/', async function (req, res) {
    var userEmail = JSON.parse(req.body.toString());
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 50,
        currency: 'gbp',
        automatic_payment_methods: { enabled: true },
        receipt_email: userEmail,
    });
    res.json({ client_secret: paymentIntent.client_secret })
})
app.use('/.netlify/functions/api', router)
module.exports = app
module.exports.handler = serverless(app)

