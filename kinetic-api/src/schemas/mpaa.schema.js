import { MPAA_RATINGS } from '#constants/movie.js'
import z from 'zod'

const mpaaSchema = z.object({
	ratingMPAA: z.enum(Object.values(MPAA_RATINGS))
})

export { mpaaSchema }

