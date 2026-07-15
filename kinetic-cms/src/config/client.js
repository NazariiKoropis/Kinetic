import axios from 'axios'

import useAuthStore from '@store/authStore'

const BASE_URL = '/api/v1'

const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})


const privateApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})


privateApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {

        const res = await publicApi.post('/auth/refresh')
        const { accessToken, user } = res.data

        useAuthStore.getState().login(user, accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        return privateApi(originalRequest)
      } catch (refreshError) {

        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export { privateApi, publicApi }
