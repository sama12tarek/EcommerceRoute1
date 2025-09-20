

import { z } from 'zod'
export const registerSchema = z.object({
  name: z.string().nonempty('this field cant be empty').min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  rePassword: z.string(),
    phone: z.string().nonempty('Phone can\'t be empty').regex(/^01[0-2,5][0-9]{8}$/, 'Invalid Egyptian phone number'),

}).refine((data) => data.password === data.rePassword, {
  error: 'Passwords do not match',
  path: ['rePassword'],
})


 export  type registerSchemaType=z.infer<typeof registerSchema>