import z from 'zod'

const createStudioSchema = z.object({
	name: z.string().min(1, 'Studio name is required'),
})
const updateStudioSchema = z.object({
	name: z.string().min(1, 'Studio name is required'),
})


export {
	createStudioSchema,
	updateStudioSchema
}
