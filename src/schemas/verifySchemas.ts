import {z} from "zod"

export const verifySchema = z.object({
    code:z.string().min(6,"Validation code must be in 6 digits!")
})