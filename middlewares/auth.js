const jwt = require('jsonwebtoken');
const auth = (role)=>{
    return (req, res, next)=>{
        try{
            //1. get the token from the header
            const token = req.header("Authorization");
            if(!token) return res.status(401).send("Access denied. No token provided");
    
            //2. verify the token
            req.payload = jwt.verify(token, process.env.JWT_KEY);
            if(role.length === 0) return next();    
            if(role.includes("user") && role.includes("admin") && role.includes("business")){
                if(!(req.params.id === req.payload._id) && !req.payload.isAdmin) return res.status(403).send("Access denied. You are not allowed to access this resource");
            }else if(role.includes("admin")){
                if(!req.payload.isAdmin) return res.status(403).send("Access denied. You are not allowed to access this resource");
            }
            else if(role.includes("business")){
                if(!req.payload.isBusiness) return res.status(403).send("Access denied. You are not allowed to access this resource");
            }
            else if(role.includes("user")){
                if(!(req.params.id === req.payload._id)) return res.status(403).send("Access denied. You are not allowed to access this resource");
            }
            next();
        }
        catch(error){
            res.status(400).send(error.message);
        }
    }
}
module.exports = auth;