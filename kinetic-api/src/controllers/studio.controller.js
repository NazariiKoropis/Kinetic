import Studio from "#models/Studio.js"
import Movie from "#models/Movie.js"

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

const getStudiosAdmin = async (req, res) => {
	try {
		const { limit = 10, page = 1, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.validatedQuery || {}
		const skip = (page - 1) * limit

		const matchStage = {}
		if (search) {
			matchStage.name = { $regex: search, $options: 'i' }
		}

		const sortStage = { [sortBy]: sortOrder === 'asc' ? 1 : -1 }

		const studios = await Studio.aggregate([
			{ $match: matchStage },
			{ $sort: sortStage },
			{ $skip: skip },
			{ $limit: limit },
			{
				$lookup: {
					from: 'movies',
					localField: '_id',
					foreignField: 'studios',
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

		const totalStudios = await Studio.countDocuments(matchStage)

		return res.status(200).json({
			success: true,
			message: 'Studios fetched successfully',
			data: studios,
			pagination: {
				totalItems: totalStudios,
				totalPages: Math.ceil(totalStudios / limit),
				currentPage: page,
				itemsPerPage: limit
			}
		})
	} catch (e) {
		console.error('Error in getStudiosAdmin:', e)
		return res.status(500).json({
			success: false,
			message: 'Internal server error'
		})
	}
}

const getStudioStats = async (req, res) => {
	try {
		const totalStudios = await Studio.countDocuments()

		const productiveStudioAggregation = await Movie.aggregate([
			{ $unwind: '$studios' },
			{ $group: { _id: '$studios', count: { $sum: 1 } } },
			{ $sort: { count: -1 } },
			{ $limit: 1 },
			{
				$lookup: {
					from: 'studios',
					localField: '_id',
					foreignField: '_id',
					as: 'studioInfo'
				}
			},
			{ $unwind: { path: '$studioInfo', preserveNullAndEmptyArrays: true } }
		])

		const viewedStudioAggregation = await Movie.aggregate([
			{ $unwind: '$studios' },
			{ $group: { _id: '$studios', totalViews: { $sum: '$views' } } },
			{ $sort: { totalViews: -1 } },
			{ $limit: 1 },
			{
				$lookup: {
					from: 'studios',
					localField: '_id',
					foreignField: '_id',
					as: 'studioInfo'
				}
			},
			{ $unwind: { path: '$studioInfo', preserveNullAndEmptyArrays: true } }
		])

		const ratedStudioAggregation = await Movie.aggregate([
			{ $unwind: '$studios' },
			{ $group: { _id: '$studios', avgRating: { $avg: '$rating' } } },
			{ $sort: { avgRating: -1 } },
			{ $limit: 1 },
			{
				$lookup: {
					from: 'studios',
					localField: '_id',
					foreignField: '_id',
					as: 'studioInfo'
				}
			},
			{ $unwind: { path: '$studioInfo', preserveNullAndEmptyArrays: true } }
		])

		const mostProductiveStudio = productiveStudioAggregation[0]?.studioInfo?.name || '-'
		const mostViewedStudio = viewedStudioAggregation[0]?.studioInfo?.name || '-'
		const mostRatedStudio = ratedStudioAggregation[0]?.studioInfo?.name || '-'

		return res.status(200).json({
			success: true,
			data: {
				totalStudios,
				mostProductive: {
					name: mostProductiveStudio,
					moviesCount: productiveStudioAggregation[0]?.count || 0
				},
				mostViewed: {
					name: mostViewedStudio,
					views: viewedStudioAggregation[0]?.totalViews || 0
				},
				highestRated: {
					name: mostRatedStudio,
					avgRating: ratedStudioAggregation[0]?.avgRating || 0
				}
			}
		})
	} catch (e) {
		console.error('Error in getStudioStats:', e)
		return res.status(500).json({
			success: false,
			message: 'Internal server error'
		})
	}
}

export { createStudio, deleteStudio, getAllStudios, getStudioById, getStudiosAdmin, getStudioStats, updateStudio }
