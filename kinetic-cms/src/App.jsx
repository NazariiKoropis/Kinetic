//libs
import Layout from '@layout/Layout'
import ChangeHistory from '@pages/change-history'
//protected
import Dashboard from '@pages/dashboard'
import Films from '@pages/films'
//pages public
import { Box, CircularProgress } from '@mui/material'
import Login from '@pages/login'
import People from '@pages/people'
import Reports from '@pages/reports'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

//components
import { refreshUser } from '@api/auth'
import { useAuthStore } from '@store/authStore'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
	const login = useAuthStore(state => state.login)
	const logout = useAuthStore(state => state.logout)
	const isInitializing = useAuthStore(state => state.isInitializing)

	useEffect(() => {
		const bootstrapAuth = async () => {
			try {
				const res = await refreshUser()
				login(res.user, res.accessToken)
			} catch (e) {
				logout()
			}
		}
		bootstrapAuth()
	}, [login, logout])

	if (isInitializing) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
					bgcolor: 'background.default'
				}}
			>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Routes>
			<Route
				path="/login"
				element={<Login />}
			/>

			<Route element={<ProtectedRoute />}>
				<Route element={<Layout />}>
					<Route
						path="/"
						element={<Dashboard />}
					/>
					<Route
						path="/people"
						element={<People />}
					/>
					<Route
						path="/films"
						element={<Films />}
					/>
					<Route
						path="/reports"
						element={<Reports />}
					/>
					<Route
						path="/change-history"
						element={<ChangeHistory />}
					/>
				</Route>
			</Route>

			<Route
				path="*"
				element={
					<Navigate
						to="/"
						replace
					/>
				}
			/>
		</Routes>
	)
}

export default App
