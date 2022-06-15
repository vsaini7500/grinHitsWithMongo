const orderModel=require('../../model/order')
const paymentModel=require('../../model/payment')
const CartModel=require('../../model/cart')
const discountmodel=require('../../model/discount')
const addModel=require('../../model/userAddress')
const err=require('../../error/index')
const response=require('../../response/index')
const foodModel=require('../../model/food')
// const random=require('../../utils/randamkey')
var rand = require("random-key");
const helperService=require('../../service/carthelper')



// function for order by promocode


const dopayment=async (req,res)=>{

    try {

        // console.log('nkjnksjijoidjiok');
        const cartId=req.body.cartId
        const addressId=req.body.addressId
        const promoId=req.body.promoId
    

        const findCart=await helperService.findById(CartModel,{_id:cartId})

        if(findCart==0){
            return res.status(200).json(err.error('NOT_FOUND','Cart not found'))
        }
        // console.log(findCart);
        const payableAmount=findCart.payableAmount

        const findaddress=await helperService.findById(addModel,{_id:addressId})

        if(findaddress==0){
            return res.status(200).json(err.error('NOT_FOUND','Address not found'))


        }
        const finddiscount=await helperService.findById(discountmodel,{_id:promoId})

        if(finddiscount==0){
            return res.status(200).json(err.error('NOT_FOUND','Promocode not found'))
        }

        const useTime=finddiscount.useTime
        const maxUse=finddiscount.maxUse
        if(parseInt(useTime) >= parseInt(maxUse)){
            return res.status(200).json(err.error('INVALID_PROMOCODE','Promo has expired'))
        }
        const dpercentage=finddiscount.discountPercentage

        const lessAmount=((payableAmount*dpercentage)/100).toFixed(2)
        const payAmount=payableAmount-lessAmount

        const payment= new paymentModel({
            cartId:cartId,
            addressId:addressId,
            promoId:promoId,
            totalAmount:payableAmount,
            lessAmountAfterPromo:lessAmount,
            payAmount:payAmount
        })

        const result=await payment.save()

        if(result){
            await discountmodel.updateOne({_id:promoId},{
                useTime:useTime+1
            })

            res.status(200).json({"msg":"successful","result":result})

        }

  
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))

        
    }
};

//  function for pay remaining payment


const paynow=async (req,res)=>{
    try {

        const paymentId=req.body.paymentId
        const payAmount=req.body.payAmount
       
        const pdetail=await helperService.findById(paymentModel,{_id:paymentId})
       
        if(pdetail==0){
           return res.status(200).json(err.error('NOT_FOUND','payment id is not found'))
        }

        if(payAmount!=pdetail.payAmount){
            return res.status(200).json(err.error('Not Acceptable','payment not successfully done'))
        }

    
        const randumKey=await rand.generate()

        
        const findCart=await helperService.findById(CartModel,{_id:pdetail.cartId})
       

        const products= findCart.Item

        products.forEach(async element => {
          const data= await foodModel.findOne({categoryId:element.categoryId},{Food:{$elemMatch:{
                "_id":element.food
            }}})
            console.log('data quantity is',data.Food[0].Quantity);
            console.log('elemenytb quantiy',element.quantity);

            if(parseInt(data.Food[0].Quantity)>parseInt(element.quantity)){
            return res.status(200).json(err.error('NOT_AVAILABLE','This quantity is not available'))
            
            }
                const newquantity=data.Food[0].Quantity-element.quantity
                await foodModel.updateOne({categoryId:element.categoryId,Food:{$elemMatch:{
                    _id:element.food
                }}},{$set:{
                    "Food.$.Quantity":newquantity
                }})    
        });
        const order=new orderModel({
            userId:findCart.userId,
            orderId:randumKey,
            "Item":findCart.Item,
            Total:findCart.payableAmount,
            Status:"Accepted"
        })
        const result=await order.save()

        if(result!=null){

            await paymentModel.deleteMany()
            await CartModel.deleteMany()
            res.status(200).json(response.successResponse({"your order No":randumKey},'Order Accepted'))   
        }
    } catch (error1) {
       res.status(200).json(err.error("BAD_REQUEST",error1.message))   
    }
}


// function for get Order

const getOrder=async(req,res)=>{
    try {
        const orderId=req.query.orderId
        const result= await orderModel.findOne({orderId:orderId})
        if(result!=null){
            res.status(200).json(response.successResponse(result,'successfully fetch'))
        }
        else{
            res.status(200).json(err.error('NOT_FOUND','Order not found'))
        }
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))
    }
};

// function for get list of all order


const getList=async (req,res)=>{
    try {
        let limit = 0 ; let skip = 0
        if(req.query.limit!=null || req.query.limit!=0){
            limit= req.query.limit
        }
        if(req.query.skip!=0 || req.query.skip != 0){
            skip = req.query.skip
        }
        const userId=req.query.userId
        const result=await orderModel.find({userId:userId}).limit(limit).skip(skip)
        if(result[0]!=null){
            res.status(200).json(response.successResponse(result,'successfully fetch'))
        }
        else{
            res.status(200).json(err.error('NOT_FOUND','Order not found'))

        }
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))
    }
};


// function for update orer status 


const updateStatus=async (req,res)=>{
    try {
        const orderId=req.body.orderId
        const Status=req.body.Status
        const findOrder=await helperService.findById(orderModel,{_id:orderId})
        if(findOrder==0){
            return res.status(200).json(err.error('NOT_FOUND','Order not found'))
        }
        if(findOrder.Status==Status){
            return res.status(200).json(err.error('ALLREADY_EXIST','Status is present'))
        }
         await orderModel.updateOne({_id:orderId},{Status:Status})

         const data=await helperService.findById(orderModel,{_id:orderId})

         res.status(200).json(response.successResponse(data,"successfully updated"))
 
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))
    }
};



module.exports={dopayment,paynow,getOrder,getList,updateStatus}