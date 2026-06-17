import { useAuthStore } from '@store/authStore'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated)
	const role = useAuthStore(state => state.user?.role)

	if (!isAuthenticated || role !== 'ROLE_ADMIN') {
		return (
			<Navigate
				to="/login"
				replace
			/>
		)
	}

	return <Outlet />
}

export default ProtectedRoute
