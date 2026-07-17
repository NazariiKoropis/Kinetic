import { MOVIE_STATUSES } from '@constants/movie'
import { MenuItem, Select } from '@mui/material'
import { getStatusColor } from '@utils/movie'

function StatusSelect({ value, onChange, fullWidth = false, sx = {}, ...props }) {
	const statusColor = getStatusColor(value || MOVIE_STATUSES.RELEASED)

	return (
		<Select
			value={value || MOVIE_STATUSES.RELEASED}
			size="small"
			onChange={onChange}
			fullWidth={fullWidth}
			sx={{
				color: `${statusColor}.main`,
				'& .MuiOutlinedInput-notchedOutline': {
					borderColor: `${statusColor}.main`
				},
				...sx
			}}
			{...props}
		>
			{Object.values(MOVIE_STATUSES).map(status => (
				<MenuItem
					key={status}
					value={status}
					sx={{ fontSize: '0.8rem' }}
				>
					{status.charAt(0).toUpperCase() + status.slice(1)}
				</MenuItem>
			))}
		</Select>
	)
}

export default StatusSelect
