import { urlencoded } from "express";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import { generateOTP, sendEmail} from '../helpers/2faUtils.js';
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address,answer} = req.body
        //validations
        if (!name){
            return res.send({message:'Name is Required'});
        }
        if (!email){
            return res.send({message:'Email is Required'});
        }
        if (!password){
            return res.send({message:'Password is Required'});
        }
        if (!phone){
            return res.send({message:'Phone no is Required'});
        }
        if (!address){
            return res.send({message:'Address is Required'});
        }
        if (!answer){
            return res.send({message:'Answer is Required'});
        }
        //check user
        const existingUser = await userModel.findOne({email});
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Register please login',
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({name,email,phone,address,answer,password: hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:'User Register Successfully',
            user,
        })

    }catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered',
            });
        }

        // Check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Password',
            });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

        // Store OTP and expiry time in user document
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send OTP
        await sendEmail(user.email, 'Your OTP Code', `Your OTP code is ${otp}`);

        // Respond with user ID for verification
        res.status(200).send({
            success: true,
            message: 'OTP sent',
            userId: user._id,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error,
        });
    }
};

export const verifyOTPController = async (req, res) => {
    const { userId, otp } = req.body;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        if (user.otp !== otp) {
            return res.status(400).send({ success: false, message: 'Invalid OTP' });
        }
        if (user.otpExpires < Date.now()) {
            return res.status(400).send({ success: false, message: 'OTP has expired' });
        }
        
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).send({
            success: true,
            message: 'OTP verified',
            user,
            token,
        });
    } catch (error) {
        console.error("Error verifying OTP:", error);  // Log the error for debugging
        res.status(500).send({ success: false, message: 'Error verifying OTP', error });
    }
};

//forgotPasswordcontroller
export const forgotPasswordController = async (req,res) => {
   try {
       const {email,answer,newPassword} = req.body
       if (!email){
        res.status(400).send({message:"Email is required"})
       }
       if (!answer){
        res.status(400).send({message:"Answer is required"})
       }
       if (!newPassword){
        res.status(400).send({message:"Email is required"})
       }
       //check 
       const user= await userModel.findOne({email,answer})
       //validation
       if(!user){
        return res.status(404).send({
            success:false,
            message:"Wrong Email or Answer"
        })
       }
       const hashed = await hashPassword(newPassword)
       await userModel.findByIdAndUpdate(user._id, {password:hashed });
       res.status(200).send({
        success:true,
        message:"Password Reset Successfully"
       })
   }  catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Something went wrong",
        error
    })
   }
};
//test controller
export const testController = (req,res) => {
    try {
        res.send("Protected Routes");
      } catch (error) {
        console.log(error);
        res.send({ error });
      }
};

