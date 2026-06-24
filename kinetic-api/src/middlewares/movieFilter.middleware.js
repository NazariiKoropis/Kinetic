const buildMovieFilter = (req, res, next) => {

	const {
		title, genres, countries, status, studios, releaseYear, duration, ratingMPAA, rating,
		page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc'
	} = req.validatedQuery

	const filter = {}

	if (title) {
		filter.$or = [
			{ title: { $regex: title, $options: 'i' } },
			{ originalTitle: { $regex: title, $options: 'i' } }
		]
	}
	if (studios) filter.studios = { $in: studios.split(',') }
	if (genres) filter.genres = { $in: genres.split(',') }
	if (countries) filter.countries = { $in: countries.split(',') }
	if (releaseYear) filter.releaseYear = releaseYear
	if (status) filter.status = status
	if (duration) filter.duration = { $gte: duration }
	if (ratingMPAA) filter.ratingMPAA = ratingMPAA
	if (rating) filter.rating = { $gte: rating }


	const skip = (page - 1) * limit
	const order = sortOrder === 'desc' ? -1 : 1


	req.mongoQuery = {
		filter,
		sort: { [sortBy]: order },
		skip,
		limit,
		page,
	}

	next()
}
export default buildMovieFilter
