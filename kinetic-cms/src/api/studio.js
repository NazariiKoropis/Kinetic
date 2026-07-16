import { privateApi, publicApi } from "@config/client"

const getStudios = async () => {
	const response = await publicApi.get('/studio')
	return response.data
}

const getStudiosAdmin = async (params) => {
	const response = await privateApi.get('/admin/studio', { params })
	return response.data
}

const updateStudio = async (id, body) => {
	const response = await privateApi.put(`/admin/studio/${id}`, body)
	return response.data
}

const deleteStudio = async (id) => {
	const response = await privateApi.delete(`/admin/studio/${id}`)
	return response.data
}

const createStudio = async (body) => {
	const response = await privateApi.post('/admin/studio', body)
	return response.data
}

const getStudiosStats = async () => {
	const response = await privateApi.get('/admin/dashboard/studio-stats')
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
