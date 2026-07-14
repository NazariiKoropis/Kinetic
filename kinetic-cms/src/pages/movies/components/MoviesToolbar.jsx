import { getGenres } from '@api/genre'
import { getStudioList } from '@api/movie'
import { MOVIE_STATUSES } from '@constants/movie'
import Loader from '@layout/Loader'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import SearchIcon from '@mui/icons-material/Search'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import {
	Autocomplete,
	Box,
	Checkbox,
	IconButton,
	InputAdornment,
	MenuItem,
	TextField,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material'
import { useEffect, useState } from 'react'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

function MoviesToolbar({
	searchTerm,
	onSearchChange,
	genre,
	onGenreChange,
	studio,
	onStudioChange,
	status,
	onStatusChange,
	sortBy,
	onSortByChange,
	sortOrder,
	onSortOrderChange,
	viewMode,
	onViewModeChange
}) {
	const [genres, setGenres] = useState([])
	const [studios, setStudios] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const [genresData, studiosData] = await Promise.all([
					getGenres(),
					getStudioList()
				])
				setGenres(genresData)
				setStudios(studiosData)
			} catch (e) {
				console.log(e)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) {
		return <Loader />
	}

	return (
		<Box
			sx={{
				display: 'grid',
				gap: 2,
				alignItems: 'center',

				gridTemplateColumns: {
					xs: '1fr',
					sm: '1fr 1fr',
					md: '200px 120px 1fr 1fr 150px 40px auto'
				},
				backgroundColor: 'background.paper',
				padding: 2,
				borderRadius: 2,
				border: '1px solid rgba(255, 255, 255, 0.15)',
				transition: 'background-color 0.3s ease'
			}}
		>
			<TextField
				label="Search by title..."
				variant="outlined"
				size="small"
				value={searchTerm}
				onChange={e => onSearchChange(e.target.value)}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						)
					}
				}}
				sx={{
					gridColumn: { xs: 'auto', sm: '1 / -1', md: 'auto' }
				}}
			/>

			<TextField
				select
				label="Status"
				variant="outlined"
				size="small"
				value={status || 'all'}
				onChange={e => onStatusChange(e.target.value)}
				sx={{
					gridColumn: { xs: 'auto', sm: 'auto', md: 'auto' }
				}}
			>
				<MenuItem value="all">All</MenuItem>
				{Object.values(MOVIE_STATUSES).map(status => (
					<MenuItem
						key={status}
						value={status}
					>
						{status.charAt(0).toUpperCase() + status.slice(1)}
					</MenuItem>
				))}
			</TextField>

			<Autocomplete
				multiple
				size="small"
				options={genres}
				disableCloseOnSelect
				getOptionLabel={option => option.name}
				isOptionEqualToValue={(option, value) => option._id === value._id}
				value={genres.filter(g => genre.includes(g._id))}
				onChange={(event, newValue) => {
					onGenreChange(newValue.map(g => g._id))
				}}
				renderOption={(props, option, { selected }) => {
					const { key, ...optionProps } = props
					return (
						<li
							key={key}
							{...optionProps}
						>
							<Checkbox
								icon={icon}
								checkedIcon={checkedIcon}
								style={{ marginRight: 8 }}
								checked={selected}
							/>
							{option.name}
						</li>
					)
				}}
				renderInput={params => (
					<TextField
						{...params}
						label="Genres"
						variant="outlined"
					/>
				)}
				sx={{
					gridColumn: { xs: 'auto', sm: 'auto', md: 'auto' }
				}}
			/>

			<Autocomplete
				multiple
				size="small"
				options={studios}
				disableCloseOnSelect
				getOptionLabel={option => option.name}
				isOptionEqualToValue={(option, value) => option._id === value._id}
				value={studios.filter(s => studio.includes(s._id))}
				onChange={(event, newValue) => {
					onStudioChange(newValue.map(s => s._id))
				}}
				renderOption={(props, option, { selected }) => {
					const { key, ...optionProps } = props
					return (
						<li
							key={key}
							{...optionProps}
						>
							<Checkbox
								icon={icon}
								checkedIcon={checkedIcon}
								style={{ marginRight: 8 }}
								checked={selected}
							/>
							{option.name}
						</li>
					)
				}}
				renderInput={params => (
					<TextField
						{...params}
						label="Studios"
						variant="outlined"
					/>
				)}
				sx={{
					gridColumn: { xs: 'auto', sm: 'auto', md: 'auto' }
				}}
			/>

			<TextField
				select
				label="Sort by"
				variant="outlined"
				size="small"
				value={sortBy || 'createdAt'}
				onChange={e => onSortByChange(e.target.value)}
				sx={{
					gridColumn: { xs: 'auto', sm: 'auto', md: 'auto' }
				}}
			>
				<MenuItem value="createdAt">Date added</MenuItem>
				<MenuItem value="title">Title</MenuItem>
				<MenuItem value="releaseYear">Release year</MenuItem>
				<MenuItem value="duration">Duration</MenuItem>
			</TextField>

			<IconButton
				onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
				title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
				size="medium"
				sx={{
					border: '1px solid rgba(255, 255, 255, 0.23)',
					borderRadius: 1,
					height: 40,
					width: 40,
					gridColumn: { xs: 'auto', sm: 'auto', md: 'auto' },
					justifySelf: { xs: 'end', sm: 'start', md: 'auto' }
				}}
			>
				{sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
			</IconButton>

			<ToggleButtonGroup
				value={viewMode}
				exclusive
				onChange={(e, newMode) => {
					if (newMode !== null) onViewModeChange(newMode)
				}}
				size="small"
				sx={{
					gridColumn: { xs: 'auto', sm: '1 / -1', md: 'auto' },
					justifySelf: { xs: 'end', md: 'auto' }
				}}
			>
				<ToggleButton
					value="table"
					aria-label="Table view"
				>
					<ViewListIcon />
				</ToggleButton>
				<ToggleButton
					value="grid"
					aria-label="Grid View"
				>
					<ViewModuleIcon />
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	)
}

export default MoviesToolbar
