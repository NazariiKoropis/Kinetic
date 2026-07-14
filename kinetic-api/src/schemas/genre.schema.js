import * as z from 'zod'

const createGenreSchema = z.object({
	name: z.string().min(1, { message: 'The name of the genre is required' }),
	slug: z.string().min(1, { message: 'The slug of the genre must be at least 1 character long' })
		.regex(/^[a-z0-9-]+$/, { message: 'Slug must contain only lowercase letters, numbers, and hyphens' })
		.optional()
})

const updateGenreSchema = z.object({
	name: z.string().min(1, { message: 'The name of the genre is required' }).optional(),
	slug: z.string().min(1, { message: 'The slug of the genre must be at least 1 character long' })
		.regex(/^[a-z0-9-]+$/, { message: 'Slug must contain only lowercase letters, numbers, and hyphens' })
		.optional()
})

export { createGenreSchema, updateGenreSchema }
