import mongoose, { Document, Schema, model } from "mongoose";

export interface Message extends Document{
    content: string,
    createdAt: Date
}

const MessageSchema : Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true

    }
})

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified: boolean,
    isAcceptMessage:boolean,
    messages:Message[],
}

const UserSchema : Schema<User> = new Schema({
    username:{
        type:String,
        required: [true,"Username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"verifyCode is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verifyCodeExpiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptMessage:{
        type:Boolean,
        default:false
    },
    messages:[MessageSchema]

})
// export const message = new model("message",MessageSchema)