import z from 'zod'

const loginSchema = z.object({
	username: z.string().min(2, 'Username must be at least 2 characters').max(50, 'Username must be at most 50 characters'),
	password: z.string().min(8, 'Password must be at least 8 characters').max(50, 'Password must be at most 50 characters')
})

export { loginSchema }

