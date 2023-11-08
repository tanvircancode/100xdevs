import {z} from "zod";

export const signupInput = z.object({ 
    username : z.string().min(3).max(20),
    password : z.string().min(2).max(20),
  })
  
  export type SignupParams = z.infer<typeof signupInput>;