import { Message } from "@/model/user";


export interface ApiResponse {
    success: boolean,
    message:string,
    isAcceptMessage?: boolean ,
    messages?: Array<Message>


}