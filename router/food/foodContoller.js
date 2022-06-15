const foodModel=require('../../model/food')
const err=require('../../error/index')
const response=require('../../response/index')
const cModel=require('../../model/category')

// function for add food in category

const addFood=async (req,res)=>{
    try {
        const categoryId=req.query.categoryId
        const check=await cModel.findById({_id:categoryId})
        if(!check){
            return res.status(200).json(err.error('NOT_FOUND','id not found'))
        }
        const check1= await foodModel.find({categoryId:categoryId})
        if(check1[0]==null){
            const food=new foodModel({
                categoryId:categoryId,
                Food:[{
                    Title:req.body.Title,
                    Cost:req.body.Cost,
                    Quantity:req.body.Quantity,
                    Description:req.body.Description
                }]
            })

           const data=await food.save();
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
            const result=await foodModel.updateOne({
                categoryId:categoryId
            },
            {
                $push:{
                    Food:req.body
                }
            }
            );

            if(result){
                const newdata=await foodModel.find({
                    categoryId:categoryId
                })
                
                res.status(200).json(response.successResponse(newdata,'successfully added one'))
            }
        }

        
    } catch (error) {
        res.status(200).json(err.error("BAD_REQUEST",error.message))

    }
}

// function for get all food


const getallfood=async (req,res)=>{
    try {

        const categoryName=req.query.name

        const check= await cModel.find({Title:{$regex:categoryName,$options:"$i"}},{_id:1})
        // console.log(check);
        if(check[0]!=null){
            // console.log(check);
            const id= check[0]._id
            // console.log(id);

            const result=await cModel.aggregate([
                {
                    $match:{
                        _id:id
                    }
                    },
                    {
                        $lookup:{
                            from:"foods",
                            localField:"_id",
                            foreignField:"categoryId",
                            as:"List"
                            
                        }
                    },
                    {
                        $project:{
                            "List._id":0,
                            "List.categoryId":0
                        }
                        
                    }
                
            ])

            res.status(200).json(response.successResponse(result,'successfully fetch'))
        }
        else{
            res.status(200).json(err.error("NOT_FOUND",'category Title not found'))

        }
        
    } catch (error) {

                res.status(200).json(err.error("BAD_REQUEST",error.message))

    }
}

module.exports={addFood,getallfood}