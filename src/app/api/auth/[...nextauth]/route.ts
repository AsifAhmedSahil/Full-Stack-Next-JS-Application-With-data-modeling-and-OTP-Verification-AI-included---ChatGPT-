
import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import dbConnect from "@/lib/dbConnect"
import bcrypt from "bcryptjs"
import UserModel from "@/model/user";


export const authOptions :NextAuthOptions  ={
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password"}
              },
              async authorize(credentials:any) : Promise<any>{
                await dbConnect();
                try {
                   const user =  await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })

                    if(!user){
                        throw new Error("No user found with this email")
                    }

                    if(!user.isVerified){
                        throw new Error("Please verify your email before login")
                    }

                    // check password ok or not
                   const isPasswordCorrect =  await bcrypt.compare(credentials.password,user.password)
                   if(isPasswordCorrect){
                    return user
                   }
                   else{
                    throw new Error("incorrect pasword!")
                   }
                    
                } catch (err : any) {
                    throw new Error(err)
                    
                }

              }
        })
    ]
}