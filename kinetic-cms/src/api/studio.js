import { privateApi, publicApi } from "@config/client"

const getStudios = async () => {
	const response = await publicApi.get('/web/studio')
	return response.data
}

const getStudiosAdmin = async (params) => {
	const response = await privateApi.get('/cms/studio', { params })
	return response.data
}

const updateStudio = async (id, body) => {
	const response = await privateApi.put(`/cms/studio/${id}`, body)
	return response.data
}

const deleteStudio = async (id) => {
	const response = await privateApi.delete(`/cms/studio/${id}`)
	return response.data
}

const createStudio = async (body) => {
	const response = await privateApi.post('/cms/studio', body)
	return response.data
}

const getStudiosStats = async () => {
	const response = await privateApi.get('/cms/dashboard/studio-stats')
	return response.data
}

export {
	createStudio,
	deleteStudio,
	getStudios,
	getStudiosAdmin,
	getStudiosStats,
	updateStudio
}
