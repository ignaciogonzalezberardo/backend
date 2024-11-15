const jwt =require ('jsonwebtoken')
const SECRET="nachopasword"

function validation(req, res, next) {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send({
            message:"no podes"
        })
    }
    jwt.verify(token,SECRET,(error,payload)=>{

        if(error){
            console.log(error)
            return res.status(401).send({
                message:"no tenes autorizacion"
            })
        }
        console.log(payload)
        req.user=payload
        next();
    })
   
   
  }
  
  module.exports = validation