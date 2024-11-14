require('dotenv').config();



const express =require("express")
const app= express()

app.use(express.json())
app.use(express.static("client"))

const stripe = require('stripe')("sk_test_51QJef7RwP0CS6vlp1xPmO3Nre0XQtp4VMvgKfYvMWeipbCfvV38ECuNVUOTiOHPikUYDhFSWh1gkhhlYE8LfLUEN00x5umMnMs"
);

const storeItems = new Map([
    [1,{priceInCents:10000,name:'Learn React Today'}],
    [2,{priceInCents:20000,name:'Learn CSS Today'}]
])

app.post('/create-checkout-session',(req,res)=>{
    res.json({url:'Hi'})
})
app.listen(3000)