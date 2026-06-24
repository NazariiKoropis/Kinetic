import Genre from '#models/Genre.js'

const getAllGenres = async (req, res) => {
	try {
		const genres = await Genre.find({}).sort({ createdAt: -1 })

		return res.status(200).json(genres)

	} catch (error) {
		console.error(error)
		return res.status(500).json({
			success: false,
			error: 'Internal Server Error'
		})
	}
}

const createGenre = async (req, res) => {
	try {
		const { name } = req.body

		const genre = await Genre.create({ name })

		if (!genre) {
			return res.status(404).json({
				success: false,
				error: 'Failed to create genre'
			})
		}

		return res.status(201).json({
			success: true,
			message: 'Genre created successfully',
			data: genre
		})
	} catch (error) {

		console.error(error)
		return res.status(500).json({
			success: false,
			error: 'Internal Server Error'
		})
	}
}

const deleteGenre = async (req, res) => {
	try {
		const { id } = req.params

		const genre = await Genre.findById(id)

		if (!genre) {
			return res.status(404).json({
				success: false,
				error: 'Genre not found'
			})
		}

		await genre.deleteOne()

		return res.status(200).json({
			success: true,
			message: 'Genre deleted successfully'
		})
	} catch (error) {

		console.error(error)
		return res.status(500).json({
			success: false,
			error: 'Internal Server Error'
		})
	}
}

const updateGenre = async (req, res) => {
	try {
		const { id } = req.params
		const { name } = req.body

		const genre = await Genre.findById(id)

		if (!genre) {
			return res.status(404).json({
				success: false,
				error: 'Genre not found'
			})
		}

		genre.name = name
		await genre.save()

		return res.status(200).json({
			success: true,
			message: 'Genre updated successfully',
			data: genre
		})
	} catch (error) {

		console.error(error)
		return res.status(500).json({
			success: false,
			error: 'Internal Server Error'
		})
	}
}

const getGenre = async (req, res) => {
	try {
		const { id } = req.params

		const genre = await Genre.findById(id)

		if (!genre) {
			return res.status(404).json({
				success: false,
				error: 'Genre not found'
			})
		}

		return res.status(200).json({
			success: true,
			message: 'Genre fetched successfully',
			data: genre
		})

	} catch (error) {

		console.error(error)
		return res.status(500).json({
			success: false,
			error: 'Internal Server Error'
		})
	}
}


export {
	createGenre, deleteGenre, getAllGenres, getGenre, updateGenre
}
