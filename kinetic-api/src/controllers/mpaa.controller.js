import Movie from "#models/Movie.js"

const updateMPAA = async (req, res) => {
	try {
		const { id } = req.params
		const { ratingMPAA } = req.body

		const movie = await Movie.findById(id)

		if (!movie) {
			return res.status(404).json({ success: false, message: 'Movie not found' })
		}

		movie.ratingMPAA = ratingMPAA
		await movie.save()
		return res.status(200).json({
			success: true,
			message: 'MPAA rating updated successfully',
		})
	} catch (e) {
		console.error(e)
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
}

export { updateMPAA }


