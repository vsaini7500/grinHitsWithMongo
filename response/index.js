const successResponse=(data,msg)=> (


    {"status":true,
    "response":data,
    "code":200,
    "error":{ },
     "msg":msg
 
    }
    )
 
 module.exports = {
    successResponse
 
 };
 