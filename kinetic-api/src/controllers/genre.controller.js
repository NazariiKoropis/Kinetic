import Genre from '#models/Genre.js'
import Movie from '#models/Movie.js'
import slugify from '#utils/slugify.js'
import mongoose from 'mongoose'


const getAllGenres = async (req, res) => {
	try {
		const genres = await Genre.find({}).sort({ createdAt: -1 })

		return res.status(200).json(genres)

	} catch (e) {
		return res.status(500).json({
			success: false,
			error: 'Internal Server Error'
		})
	}
}

const createGenre = async (req, res) => {
	try {
		const { name, slug } = req.body

		const genre = await Genre.create({
			name,
			slug: slug || slugify(name)
		})

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
	} catch (e) {

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
	} catch (e) {

		return res.status(500).json({
			success: false,
			error: 'Internal Server Error'
		})
	}
}

const updateGenre = async (req, res) => {
	try {
		const { id } = req.params
		const { name, slug } = req.body

		const genre = await Genre.findById(id)

		if (!genre) {
			return res.status(404).json({
				success: false,
				error: 'Genre not found'
			})
		}

		if (name) {
			genre.name = name
			if (!slug) {
				genre.slug = slugify(name)
			}
		}
		if (slug) {
			genre.slug = slug
		}
		await genre.save()

		return res.status(200).json({
			success: true,
			message: 'Genre updated successfully',
			data: genre
		})
	} catch (e) {

		return res.status(500).json({
			success: false,
			error: 'Internal Server Error'
		})
	}
}

const getGenre = async (req, res) => {
	try {
		const { id } = req.params

		let genre
		if (mongoose.Types.ObjectId.isValid(id)) {
			genre = await Genre.findById(id)
		} else {
			genre = await Genre.findOne({ slug: id.toLowerCase() })
		}

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

	} catch (e) {


		return res.status(500).json({
			success: false,
			error: 'Internal Server Error'
		})
	}
}

const getGenresAdmin = async (req, res) => {
	try {
		const { limit = 10, page = 1, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.validatedQuery || {}
		const skip = (page - 1) * limit

		const matchStage = {}
		if (search) {
			matchStage.name = { $regex: search, $options: 'i' }
		}

		const sortStage = { [sortBy]: sortOrder === 'asc' ? 1 : -1 }

		const genres = await Genre.aggregate([
			{ $match: matchStage },
			{ $sort: sortStage },
			{ $skip: skip },
			{ $limit: limit },
			{
				$lookup: {
					from: 'movies',
					localField: '_id',
					foreignField: 'genres',
					as: 'movies'
				}
			},
			{
				$addFields: {
					moviesCount: { $size: '$movies' }
				}
			},
			{
				$project: {
					movies: 0
				}
			}
		])

		const totalGenres = await Genre.countDocuments(matchStage)

		return res.status(200).json({
			success: true,
			message: 'Genres fetched successfully',
			data: genres,
			pagination: {
				totalItems: totalGenres,
				totalPages: Math.ceil(totalGenres / limit),
				currentPage: page,
				itemsPerPage: limit
			}
		})

	} catch (e) {
		console.error('Error in getGenresAdmin:', e)
		return res.status(500).json({
			success: false,
			error: 'Internal Server Error'
		})
	}
}
const getGenreStats = async (req, res) => {
	try {
		const totalGenres = await Genre.countDocuments()

		const popularGenreAggregation = await Movie.aggregate([
			{ $unwind: '$genres' },
			{ $group: { _id: '$genres', count: { $sum: 1 } } },
			{ $sort: { count: -1 } },
			{ $limit: 1 },
			{
				$lookup: {
					from: 'genres',
					localField: '_id',
					foreignField: '_id',
					as: 'genreInfo'
				}
			},
			{ $unwind: { path: '$genreInfo', preserveNullAndEmptyArrays: true } }
		])

		const viewedGenreAggregation = await Movie.aggregate([
			{ $unwind: '$genres' },
			{ $group: { _id: '$genres', totalViews: { $sum: '$views' } } },
			{ $sort: { totalViews: -1 } },
			{ $limit: 1 },
			{
				$lookup: {
					from: 'genres',
					localField: '_id',
					foreignField: '_id',
					as: 'genreInfo'
				}
			},
			{ $unwind: { path: '$genreInfo', preserveNullAndEmptyArrays: true } }
		])

		const ratedGenreAggregation = await Movie.aggregate([
			{ $unwind: '$genres' },
			{ $group: { _id: '$genres', avgRating: { $avg: '$rating' } } },
			{ $sort: { avgRating: -1 } },
			{ $limit: 1 },
			{
				$lookup: {
					from: 'genres',
					localField: '_id',
					foreignField: '_id',
					as: 'genreInfo'
				}
			},
			{ $unwind: { path: '$genreInfo', preserveNullAndEmptyArrays: true } }
		])

		const likedGenreAggregation = await Movie.aggregate([
			{ $unwind: '$genres' },
			{
				$group: {
					_id: '$genres',
					totalLikes: { $sum: '$likesCount' },
					totalDislikes: { $sum: '$dislikesCount' }
				}
			},
			{
				$addFields: {
					totalVotes: { $add: ['$totalLikes', '$totalDislikes'] }
				}
			},
			{ $match: { totalVotes: { $gt: 0 } } },
			{
				$addFields: {
					likesPercent: {
						$multiply: [
							{ $divide: ['$totalLikes', '$totalVotes'] },
							100
						]
					}
				}
			},
			{ $sort: { likesPercent: -1 } },
			{ $limit: 1 },
			{
				$lookup: {
					from: 'genres',
					localField: '_id',
					foreignField: '_id',
					as: 'genreInfo'
				}
			},
			{ $unwind: { path: '$genreInfo', preserveNullAndEmptyArrays: true } }
		])

		const mostPopularGenre = popularGenreAggregation[0]?.genreInfo?.name || '-'
		const mostViewedGenre = viewedGenreAggregation[0]?.genreInfo?.name || '-'
		const mostRatedGenre = ratedGenreAggregation[0]?.genreInfo?.name || '-'

		return res.status(200).json({
			success: true,
			data: {
				totalGenres,
				mostPopularGenre,
				mostViewedGenre,
				mostRatedGenre,
				mostPopular: {
					name: mostPopularGenre,
					moviesCount: popularGenreAggregation[0]?.count || 0
				},
				mostViewed: {
					name: mostViewedGenre,
					views: viewedGenreAggregation[0]?.totalViews || 0
				},
				mostLiked: {
					name: likedGenreAggregation[0]?.genreInfo?.name || '-',
					likesPercent: likedGenreAggregation[0] ? Math.round(likedGenreAggregation[0].likesPercent) : 0
				}
			}
		})

	} catch (e) {
		console.error('Error in getGenreStats:', e)
		return res.status(500).json({
			success: false,
			error: `Internal Server Error`
		})
	}
}

export {
	createGenre, deleteGenre, getAllGenres, getGenre, getGenresAdmin, getGenreStats, updateGenre
}
