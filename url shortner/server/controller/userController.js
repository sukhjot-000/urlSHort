const USER = require('./../models/userModel');
const URL = require('./../models/urlModel'); // Update the path accordingly
const jwt=require('jsonwebtoken')
exports.createUser=async(req,res,next)=>{
    console.log(req.body)
    try{
    const user= new USER({
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
    })
    await user.save();
    res.status(201).json({
        status: 'success',
        
      });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
    }
}
exports.getUser=async(req,res,next)=>{
    try{
   const user=await USER.findOne({email:req.body.email})
   console.log(user)
   if(user.password!=req.body.password){
    res.status(400).json({
        status: 'wrong credentials'
      });
   }
   else{
    const token=signToken(user.id)
    res.status(200).json({
        status: 'success',
        token,
        userName:user.userName,
      });
   }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
    }
}
const signToken=(id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
}
const verifyToken = async (token) => {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    //   console.log(decoded)
      return decoded.id;
    } catch (error) {
      console.log(error);
    }
};
exports.getUrls=async(req,res,next)=>{
    try{
    const id=await verifyToken(req.body.token)
    const userUrls = await URL.find({ createdby: id }).populate('createdby');
    if (userUrls.length === 0) {
        return res.status(404).json({
          status: 'success',
          message: 'No URLs found for the user',
          urls: [],
        });
    }
    res.status(200).json({
        status: 'success',
        urls: userUrls,
      });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
    }
    
}