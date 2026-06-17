import z from 'zod';

const userRegisterSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
    surname: z.string().min(2, 'Surname must be at least 2 characters').max(50, 'Surname must be at most 50 characters'),
    username: z.string().min(2, 'Username must be at least 2 characters').max(50, 'Username must be at most 50 characters'),
    gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
    birthDate: z.coerce.date({ required_error: 'Birth date is required' }),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters').max(50, 'Password must be at most 50 characters'),
})

const userLoginSchema = z.object({
    username: z.string().min(2, 'Username must be at least 2 characters').max(50, 'Username must be at most 50 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters').max(50, 'Password must be at most 50 characters')
})


export { userLoginSchema, userRegisterSchema };

