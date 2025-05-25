import userModel from "../models/userModel.js";


//register Controller
export const registerController = async(req,res)=>{
      
      try {
        const {name, email, password, address, city, country, phone} = req.body;
        if(!name || !email || !password || !address || !city || !country || !phone){
          return res.status(500).send({
            success:false,
            message:"Please provide all required fields"
          })  
        }
        const existingUser = await userModel.findOne({email});
        if(existingUser){
          return res.status(500).send({
            success:false,
            message:"email already exist"
          })
        }
        const user = await userModel.create({
          name,
          email,
          password,
          address,
          city,
          country,
          phone,
        });
        res.status(201).send({
          success:true,
          message:"Registered successfully, plz login",
          user
        })
      } catch (error) {
        console.log(error.message);
        return res.status(500).send({
          success:false,
          message:"Error in registercontroller "
        })
        
      }
}


//login Controller

export const logincontroller = async(req,res)=>{
  try {
    const {email,password}=req.body;
    
    //check if empty
    if(!email || !password){
      return res.status(500).send({
        success : false,
        message:" field is empty",
      })}

    //fetch User
    const existingUser = await userModel.findOne({email});

    //checking User
    if(!existingUser){
      console.log("account missing")
      return res.status(500).send({
        success : false,
        message:"Incorrect Credential",
      })
    }

    //Check password

    const  isMatch= await existingUser.comparePassword(password);

    // Password Validation
    if(!isMatch){
      console.log("Password not match")
      return res.status(500).send({
        success : false,
        message:"Invalid Credential",
      })
    }
    
     
    
    
    //JWT Token
    const token = user.generateToken()

    res.status(200).cookie("token",token, {
      expires: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === "development" ? true : false,
      httpOnly: process.env.NODE_ENV === "development" ? true : false,

    })
    
    .send({
      success: true,
      message: "Login Succesfully",
      user,
      token
    })
  } catch (error) {
    
      console.log("Error in login controlller:",error.message)
      return res.status(500).send({
        success : false,
        message:"Internal server error",
      })
  }
}

//User Profile

export const getUserProfileController = async (req,res) =>{
  try{
    const user = await userModel.findById(decodeData._id);
    res.status(200).send({
        success : true,
        message:"Your profile fetched succesfully",
        user
      })
    
  } catch (error) {
    
      console.log(error)
      res.status(500).send({
        success : false,
        message:"Error in finding your profile",
      })
  }
}





