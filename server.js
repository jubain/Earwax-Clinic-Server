const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const path = require('path')
const stripe = require('stripe')(process.env.SECRET_KEY)
// const stripe = new Stripe(process.env.SECRET_KEY)
let cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const router = express.Router()
const port = process.env.PORT || 8080



app.use('/api', router)

app.listen(port, error => {
    if (error) throw error
    console.log("The server is running on port " + port)
})

app.get('/secret', async (req, res) => {
    let status, error
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 3000,
        currency: 'gbp',
        automatic_payment_methods: { enabled: true },
        receipt_email: 'jubeennp@gmail.com',
    });
    res.json({ client_secret: paymentIntent.client_secret })


    // if (req.method === "POST") {
    //     try {
    //         const { amount } = req.body
    //         const paymentIntent = await stripe.paymentIntents.create({
    //             amount: 1099,
    //             currency: 'gbp',
    //             automatic_payment_methods: { enabled: true },
    //         });
    //         res.json({ client_secret: paymentIntent.client_secret })
    //         res.status(200).send(paymentIntent.client_secret)
    //     } catch (error) {
    //         res.status(500).json({ statusCode: 500, message: error.message })
    //     }
    // } else {
    //     res.setHeader('Allow', "POST")
    //     res.status(405).end("Method not allowed")
    // }


    // const { amount } = req.body
    // try {
    //     await Stripe.charges.create({
    //         amount,
    //         currency: 'usd',
    //     })
    //     status = "success"
    // } catch (error) {

    // }

})