import Country from "#models/Country.js"

const createCountry = async (req, res) => {
	try {
		const { name, code } = req.body

		if (await Country.findOne({ name, code })) {
			return res.status(400).json({
				success: false,
				message: 'Country already exists'
			})
		}

		const country = await Country.create({ name, code })

		return res.status(201).json({
			success: true,
			message: 'Country created successfully',
			data: country
		})
	} catch (e) {
		console.error(e)
		return res.status(500).json({
			success: false,
			message: 'Internal server error'
		})
	}
}

const updateCountry = async (req, res) => {
	try {
		const { id } = req.params
		const { name, code } = req.body

		const country = await Country.findById(id)

		if (!country) {
			return res.status(404).json({
				success: false,
				message: 'Country not found'
			})
		}

		const isExist = await Country.findOne({
			code, _id: { $ne: id }
		})

		if (isExist) {
			return res.status(400).json({
				success: false,
				message: 'Country code already exists'
			})
		}

		country.name = name || country.name
		country.code = code || country.code
		await country.save()

		return res.status(200).json({
			success: true,
			message: 'Country updated successfully',
			data: country
		})
	} catch (e) {
		console.error(e)
		return res.status(500).json({
			success: false,
			message: 'Internal server error'
		})
	}
}


const deleteCountry = async (req, res) => {
	try {
		const { id } = req.params
		const country = await Country.findById(id)

		if (!country) {
			return res.status(404).json({
				success: false,
				message: 'Country not found'
			})
		}

		await country.deleteOne()

		return res.status(200).json({
			success: true,
			message: 'Country deleted successfully'
		})
	} catch (e) {
		console.error(e)
		return res.status(500).json({
			success: false,
			message: 'Internal server error'
		})
	}
}

const getCountries = async (req, res) => {
	try {
		const countries = await Country.find()

		return res.status(200).json({
			success: true,
			message: 'Countries fetched successfully',
			data: countries
		})
	} catch (e) {
		console.error(e)
		return res.status(500).json({
			success: false,
			message: 'Internal server error'
		})
	}
}
export { createCountry, deleteCountry, getCountries, updateCountry }
