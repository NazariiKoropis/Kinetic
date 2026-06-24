import * as z from 'zod'

const createCountrySchema = z.object({
	name: z.string().min(1, { message: 'The name of the country is required' }),
	code: z.string().min(2, { message: 'The code of the country must be 2 characters long' }).max(3, { message: 'The code of the country must be 3 characters long' })
})

const updateCountrySchema = z.object({
	name: z.string().min(1, { message: 'The name of the country is required' }).optional(),
	code: z.string().min(2, { message: 'The code of the country must be 2 characters long' }).max(3, { message: 'The code of the country must be 3 characters long' }).optional()
})

export { createCountrySchema, updateCountrySchema }
