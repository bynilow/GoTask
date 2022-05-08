const jwt = require('jsonwebtoken')
const response = require("../response")


module.exports = async(req,res,next) => {
    if(req.method === "OPTIONS") {
        next()
    }

    try{
        console.log("authmiddle: "+req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1] /// сам токен это второй элемент
        
        if(!token){
            return response.status(401, {message: "ОШИБКА ВХОДА - ТОКЕН"}, res)
        }
        const decoded = await jwt.verify(token, 'its my token')
        
        req.user = decoded
        
        next()
    }
    catch(e){
        
        return response.status(401, {message: "ОШИБКА ВХОДА", req}, res)
    }
}