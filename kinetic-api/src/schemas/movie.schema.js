import * as z from 'zod';



const movieCreateSchema = z.object({


});

const movieUpdateSchema = movieCreateSchema.partial();

export { movieCreateSchema, movieUpdateSchema };

