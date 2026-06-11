import z from 'zod'

const userRegisterSchema = z.object({
    name: z.string().min(3).max(50),
    surname: z.string().min(3).max(50),
    username: z.string().min(3).max(50),
    gender: z.enum(['male', 'female']),
    birthDate: z.coerce.date(),
    email: z.string().email(),
    password: z.string().min(8).max(50),
})

const userLoginSchema = z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(8).max(50),
})


export { userRegisterSchema, userLoginSchema };