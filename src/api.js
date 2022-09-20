const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
require('dotenv').config()
let cors = require('cors')

const stripe = require('stripe')(sk_test_51LjPI2LQopOFCRZk9ING2Mt8vxqxkU6KIIfOOEMmkZH29TmnueKyOyWScKnBmZa3DqiIM6DIFro2s3zHfxghK6pT00kOMM5Dvu)

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
const router = express.Router()

router.get('/', async function (req, res) {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 3000,
        currency: 'gbp',
        automatic_payment_methods: { enabled: true },
        receipt_email: 'jubeennp@gmail.com',
    });
    res.json({ client_secret: paymentIntent.client_secret })
})
app.use('/.netlify/functions/api', router)
module.exports = app
module.exports.handler = serverless(app)

