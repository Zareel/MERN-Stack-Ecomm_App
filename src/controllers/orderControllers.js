import Product from "../models/productSchema.js"
import Orders from "../models/orderSchema.js"
import razorpay from "../config/razorpayConfig.js"

export const generateRazorpayOrderId = async(req, res) => {
    try{
        const {products, couponCode} = req.body
        if(!products || products.length === 0 ){
            return res.status(400).json({
                success:false,
                message:"no prducts found"
            })
        }
        let totalAmount = 0
        const options = {
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt:`receipt_${new Date().getTime()}`
        }
        const order = await razorpay.orders.create(options)
    }catch(error){
        console.log(error)
    }
}