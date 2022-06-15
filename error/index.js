const error=(errCode,errMsg)=> (


   {"status":true,
   "response":null,
   "code":200,
   "error":{
       "errCode":errCode,
       "errMsg":errMsg
    },
    "msg":""

   }
   )

module.exports = {
    error

};
