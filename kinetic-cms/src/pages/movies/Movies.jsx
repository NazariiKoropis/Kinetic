import { Box } from '@mui/material'
import MoviesStatsOverview from './components/MoviesStatsOverview'
// Тут пізніше буде імпорт Toolbar і Table

function Movies() {
	return (
		<Box
			component="section"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3
			}}
		>
			{/* 1. Блок статистики */}
			<MoviesStatsOverview />

			{/* 2. Блок фільтрів та пошуку (зробимо пізніше) */}
			{/* <MoviesToolbar /> */}

			{/* 3. Блок таблиці/карточок (зробимо пізніше) */}
			{/* <MoviesTable /> */}
		</Box>
	)
}

export default Movies
