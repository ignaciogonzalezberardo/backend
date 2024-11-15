function isAdmin(req,res,next){
    if(req.user.role!=="admin"){
        return res.status(403).send({
            message:"NO PODES"
        })
    }
    next()
}

module.exports=isAdmin