import { getGenreList } from '@api/movie'
import { MOVIE_STATUSES } from '@constants/movie'
import Loader from '@layout/Loader'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import SearchIcon from '@mui/icons-material/Search'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleIcon from '@mui/icons-material/ViewModule'

import {
	Autocomplete,
	Box,
	Checkbox,
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
	status,
	onStatusChange,
	viewMode,
	onViewModeChange
}) {
	const [genres, setGenres] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchGenres = async () => {
			try {
				setLoading(true)
				const response = await getGenreList()
				setGenres(response)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		fetchGenres()
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
					xs: '1fr auto',
					md: '250px 150px 1fr auto'
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
					gridColumn: { xs: '1 / -1', md: 'auto' }
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
					gridColumn: { xs: '1 / -1', md: 'auto' }
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
					gridColumn: { xs: '1', md: 'auto' },
					maxWidth: { xs: 'none', md: '200px' }
				}}
			/>

			<ToggleButtonGroup
				value={viewMode}
				exclusive
				onChange={(e, newMode) => {
					if (newMode !== null) onViewModeChange(newMode)
				}}
				size="small"
				sx={{
					gridColumn: { xs: '2', md: 'auto' },
					justifySelf: 'end'
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
