const CartModel=require('../../model/cart')
const err=require('../../error/index')
const response=require('../../response/index')

const foodModel=require('../../model/food')
const discountmodel=require('../../model/discount')

const helperService=require('../../service/carthelper')
const addToCart=async (req,res)=>{

    try {
        const userId=req.query.userId
        const foodid=req.body.food
        const quantity=req.body.quantity
        const categoryId=req.body.categoryId
    
        if(quantity<1){
            return res.status(200).json(err.error("NOT_ACCEPT","Quantity can't add"))
        }

        const check=await foodModel.findOne({categoryId:categoryId},{Food:{$elemMatch:{
            _id:foodid
        }}})
          console.log('check is',check);
          console.log('food is equal to',check.Food[0]);
        const cost=check.Food[0].Cost
        const foodquantity=check.Food[0].Quantity
        console.log('food',foodquantity);
        console.log('q',quantity);
        console.log(quantity>foodquantity);

        if(parseInt(quantity)>parseInt(foodquantity)){
            return res.status(200).json(err.error('NOT_AVAILABLE','This quantity is not available'))
        }
    
         const subTotal=cost*quantity

        const check1= await CartModel.find({userId:userId})
        if(check1[0]==null){
            const cart=new CartModel({
                userId:userId,
                Item:[{
                    categoryId:req.body.categoryId,
                    food:req.body.food,
                    quantity:req.body.quantity,
                }],
                subTotal:subTotal,
                payableAmount:subTotal
            })

           const data=await cart.save();
           if(data)
           {
               res.status(200).json(response.successResponse(data,'successfully added'))
           }
           else
           {
               res.status(200).json(err.error("FOR_BIDDEN",'not added'))
           }
           
        }
        else{
            const newSubTotal= check1[0].subTotal+subTotal
            const newPayableAmount= newSubTotal
            const result=await CartModel.updateOne({
                userId:userId
            },
            {
                $push:{
                    Item:req.body
                }
            }
            );

            if(result){
                const newdata=await CartModel.findOneAndUpdate({
                    userId:userId
                },{$set:{subTotal:newSubTotal,payableAmount:newPayableAmount}})
                
                res.status(200).json(response.successResponse(newdata,'successfully added one more '))
            }
        }
        
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))

        
    }
}


const upadatequantity=async (req,res)=>{

    try {

        const userId=req.query.userId

        const foodid=req.body.food
        const quantity=req.body.quantity
    
       
        

        if(quantity<1){
            return res.status(200).json(err.error("NOT_ACCEPT","Quantity can't add"))
        }
        const check=await helperService.findOne(CartModel,{userId:userId,Item:
            {$elemMatch:
                {food:foodid}}})

         if(check==0){
             return res.status(200).json(err.error('NOT_FOUND','Cart not found'))
         }       


        const oldsubTotal=check.subTotal
        console.log('check is -----------',check);
        // console.log('old subTotal -----',oldsubTotal);
        const category=check.Item[0].categoryId
        // console.log('category----',category);

        const oldquantity=check.Item[0].quantity


        const cartId=check._id
      
        const check1=await foodModel.findOne({categoryId:category},{Food:{$elemMatch:{
            _id:foodid
        }}})
          console.log('check is',check1);
        //   console.log('food is equal to',check1.Food[0]);
        const cost=check1.Food[0].Cost
    
         const oldcost=cost*oldquantity
        //  console.log('old subTotal',oldcost);

         const foodquantity=check1.Food[0].Quantity
         console.log('food quantity is',foodquantity);
         console.log('quantity is',quantity);
        console.log('comapre',parseInt(quantity)>parseInt(foodquantity));


         if(parseInt(quantity)>parseInt(foodquantity)){
            return res.status(200).json(err.error('NOT_AVAILABLE','This quantity is not available'))
         }


        //  console.log('    quantiti is ',quantity);
         const newCost=cost*quantity

         const newsubTotal=oldsubTotal-oldcost+newCost

         await CartModel.findOneAndUpdate({userId:userId,Item:
            {$elemMatch:
                {"_id":check.Item[0]._id}}},
         {$set:
            {"Item.$.quantity":quantity,
            subTotal:newsubTotal,
            payableAmount:newsubTotal
        }})
      const data= await CartModel.findById({_id:cartId})

        res.status(200).json(response.successResponse(data,'successfully updated'))
        
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))

        
    }
}

const applypromo=async (req,res)=>{

    try {
       const cartId=req.body.cartId
       const promoId=req.body.promoId

       const promo=await discountmodel.findById({_id:promoId})

       const cart=await CartModel.findById({_id:cartId})
       console.log('---------promo-------------');

       const dpercentage=promo.discountPercentage
       const maxUse=promo.maxUse
       console.log('maxuse',maxUse);
       const useTime=promo.useTime
       console.log('useTime',useTime);
       if(parseInt(useTime)==parseInt(maxUse)){

        res.status(200).json(err.error('INVALID_PROMOCODE','promocode has exipired'))
       }

       const subTotal=cart.subTotal
       const lessAmount=((subTotal*dpercentage)/100).toFixed(2)
    //    const payableAmount=cart.payableAmount

       const result=await CartModel.updateOne({_id:cartId},
        {lessAmountAfterPromocode:lessAmount,
            payableAmount:subTotal-lessAmount})

            if(result.matchedCount!=0){
                await discountmodel.updateOne({_id:promoId},{
                    useTime:useTime+1
                })
                const data=await CartModel.findById({_id:cartId})

                res.status(200).json(response.successResponse(data,'Promo Code successfully applied'))
            }
        
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))

        
    }

}

const getcart=async (req,res)=>{

try {
    const userId=req.query.userId
    const result=await CartModel.findOne({userId:userId})
    console.log(result);
    if(result){
        res.status(200).json(response.successResponse(result,'successfully fetch'))
    }
    else{
        res.status(200).json(err.error("NOT_FOUND","User has't any cart"))
    }

    
} catch (error) {
    res.status(200).json(err.error("BAD_REQUEST",error.message))

    
}
    
}

module.exports={addToCart,upadatequantity,applypromo,getcart}