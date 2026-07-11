import Studio from "#models/Studio.js"

const createStudio = async (req, res) => {
	try {
		const { name } = req.body

		if (await Studio.findOne({ name }).lean()) {
			return res.status(400).json({ success: false, message: 'Studio already exists' })
		}

		const studio = new Studio({ name })
		await studio.save()
		res.status(201).json({ success: true, data: studio })
	} catch (e) {
		console.error(e)
		res.status(500).json({ success: false, message: 'Error creating studio', error: e.message })
	}
}

const updateStudio = async (req, res) => {
	try {
		const { id } = req.params
		const { name } = req.body
		const studio = await Studio.findByIdAndUpdate(id, { name }, { new: true })
		res.status(200).json({ success: true, data: studio })
	} catch (e) {
		console.error(e)
		res.status(500).json({ success: false, message: 'Error updating studio', error: e.message })
	}
}

const deleteStudio = async (req, res) => {
	try {
		const { id } = req.params
		await Studio.findByIdAndDelete(id)
		res.status(200).json({ success: true, message: 'Studio deleted' })
	} catch (e) {
		console.error(e)
		res.status(500).json({ success: false, message: 'Error deleting studio', error: e.message })
	}
}


//TODO: add pagination and filter mb for future table
const getAllStudios = async (req, res) => {
	try {
		const studios = await Studio.find()
		res.status(200).json({ success: true, data: studios })
	} catch (e) {
		console.error(e)
		res.status(500).json({ success: false, message: 'Error getting studios', error: e.message })
	}
}

const getStudioById = async (req, res) => {
	try {
		const { id } = req.params
		const studio = await Studio.findById(id)
		res.status(200).json({ success: true, data: studio })
	} catch (e) {
		console.error(e)
		res.status(500).json({ success: false, message: 'Error getting studio', error: e.message })
	}
}

export { createStudio, deleteStudio, getAllStudios, getStudioById, updateStudio }
