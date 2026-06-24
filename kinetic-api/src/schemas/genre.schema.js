import * as z from 'zod'

const createGenreSchema = z.object({
	name: z.string().min(1, { message: 'The name of the genre is required' }),
})

const updateGenreSchema = z.object({
	name: z.string().min(1, { message: 'The name of the genre is required' })
})

export { createGenreSchema, updateGenreSchema }
