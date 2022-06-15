// 1. find by id query
const findById=async (model,qury,res)=>{
    try {
        res=await model.findById(qury)
        if(res!=null){
            return res
        }
        else{
            return 0
        }
    } catch (error) {

        return error
    }
}

const findOne=async (model,query,res)=>{
    try {
        res= await model.findOne(query)
        if(res!=null)
        {
            return res
        }
        else{
            return 0
        }
        
    } catch (error) {
        return error
        
    }
}

module.exports={findById,findOne}