const jwt=require('jsonwebtoken')
const isAuthenticate=(req,res,next)=>{
    if(!req.headers.authorization)
    return res.status(401).json({
        message: "no unauthorized "
    })

    const result=jwt.verify(req.headers.authorization,"MYSECRETKEY")
    if(result)
    {
        console.log("forwarded ",result)
        next()
    }
    else
    {
        
        res.status(401).json({
            message: "no unauthorized "
        })
    }
    
}
module.exports={isAuthenticate}