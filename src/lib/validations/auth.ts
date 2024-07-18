import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().min(1, { message: "E-posta adresinizi girin." }) ,
  
})

export type TuserAuthSchema = z.infer<typeof userAuthSchema>