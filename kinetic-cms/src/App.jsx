import Layout from '@layout/Layout'
import ChangeHistory from '@pages/change-history'

import Dashboard from '@pages/dashboard'
import Films from '@pages/films'

import Login from '@pages/login'
import People from '@pages/people'
import Reports from '@pages/reports'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useRefreshUser } from '@hooks/useRefresh'
import Loader from '@layout/Loader'
import ProtectedRoute from '@routes/ProtectedRoute'

function App() {
	const isInitializing = useRefreshUser()

	if (isInitializing) {
		return <Loader />
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
