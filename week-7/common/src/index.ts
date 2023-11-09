import {z} from "zod";

export const signupInput = z.object({ 
    username : z.string().min(3).max(20),
    password : z.string().min(2).max(20),
  })
  
  export const todosInput = z.object({ 
    title : z.string().min(3).max(20),
    description : z.string().min(2).max(30),
  })
  
  export type SignupParams = z.infer<typeof signupInput>;
  export type TodosParams = z.infer<typeof todosInput>;
