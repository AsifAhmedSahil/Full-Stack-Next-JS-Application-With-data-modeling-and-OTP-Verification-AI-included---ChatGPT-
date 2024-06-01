import {z} from "zod"

export const messageValidationSchema = z.object({
    content:z.string().min(10),
    
})