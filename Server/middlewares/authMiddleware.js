import JWT from 'jsonwebtoken';
import userModel from '../models/userModel';

//Middleware:- that acts when user tries to login and middleware compars the token and if it matches then middleware gives access to profile
export const isAuth = async (req,res,next) =>{
    const {token} = req.cookies

    //validation
    if(!token){
      return res.status(402).send({
        success : false,
        message:"UnAuthorised User",
      })
    }

    //
    const decodeData = JWT.verify(token,process.env.JWT_SECRET);   //verifying the token 
    req.user = await userModel.findById(decodeData._id)  //getting the id as there is no base for identifyng a user
    next()

}