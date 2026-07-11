import { useRefreshUser } from '@hooks/useRefresh'
import Layout from '@layout/Layout'
import Loader from '@layout/Loader'
import ChangeHistory from '@pages/change-history'
import Dashboard from '@pages/dashboard'
import Login from '@pages/login'
import MovieFormPage from '@pages/movies/MovieFormPage'
import People from '@pages/people'
import Reports from '@pages/reports'
import ProtectedRoute from '@routes/ProtectedRoute'
import { Navigate, Route, Routes } from 'react-router-dom'

import Movies from './pages/movies'

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
						path="/movies"
						element={<Movies />}
					/>

					<Route
						path="/movies/add-movie"
						element={<MovieFormPage />}
					/>
					<Route
						path="/movies/edit-movie/:id"
						element={<MovieFormPage />}
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
