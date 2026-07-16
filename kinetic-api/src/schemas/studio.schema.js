import z from 'zod'

const createStudioSchema = z.object({
	name: z.string().min(1, 'Studio name is required'),
})
const updateStudioSchema = z.object({
	name: z.string().min(1, 'Studio name is required'),
})


const getStudiosAdminSchema = z.object({
	limit: z.coerce.number().optional(),
	page: z.coerce.number().optional(),
	search: z.string().optional(),
	sortBy: z.enum(['createdAt', 'updatedAt']).optional(),
	sortOrder: z.enum(['asc', 'desc']).optional()
})

export {
	createStudioSchema,
	updateStudioSchema,
	getStudiosAdminSchema
}
