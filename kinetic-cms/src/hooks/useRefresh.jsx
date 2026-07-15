import { refreshUser } from '@api/auth'
import useAuthStore from '@store/authStore'
import { useEffect } from 'react'

const useRefreshUser = () => {
	const login = useAuthStore(state => state.login)
	const logout = useAuthStore(state => state.logout)
	const isInitializing = useAuthStore(state => state.isInitializing)

	useEffect(() => {
		const authCheck = async () => {
			try {
				const res = await refreshUser()
				login(res.user, res.accessToken)
			} catch {
				logout()
			}
		}
		authCheck()
	}, [login, logout])

	return isInitializing
}

export { useRefreshUser }
