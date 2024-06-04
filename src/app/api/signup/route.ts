import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/user"
import bcrypt from "bcryptjs"


export async function POST(request:Request){
    await dbConnect()
    try {

        const {username,email,password} = await request.json()

        const existingUserVerifiedByUsername = await UserModel.find({
            username,
            isVerified:true
        })

        if(existingUserVerifiedByUsername){
            return Response.json({
                success:false,
                message:"Username Already taken!"
            },
        {
            status:400
        })
        }

        // existing user by email
        const existingUserByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(1000 + Math.random() * 9000).toString()

        if(existingUserByEmail){
            true
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10)

            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry : expiryDate,
                isVerified: false,
                isAcceptMessage:true,
                messages:[],
            })

            await newUser.save()
        }

       
        
    } catch (error) {
        console.error("Error registering user",error)
        Response.json({
            success:false,
            message: "Error registering user"
        },
    {
        status: 500
    })
        
    }
}