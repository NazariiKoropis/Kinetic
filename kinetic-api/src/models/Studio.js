
import mongoose from 'mongoose'

const studioSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

const Studio = mongoose.model('Studio', studioSchema)

export default Studio
