import {z} from "zod"

export const acceptMessageValidationSchema = z.object({
    acceptMessage:z.boolean(),
    
})