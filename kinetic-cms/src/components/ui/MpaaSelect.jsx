import { MPAA_RATINGS } from '@constants/movie'
import { MenuItem, Select } from '@mui/material'

function MpaaSelect({ value, onChange, sx = {} }) {
	return (
		<Select
			value={value || MPAA_RATINGS.NR}
			size="small"
			onChange={onChange}
			sx={sx}
		>
			{Object.values(MPAA_RATINGS).map(rating => (
				<MenuItem
					key={rating}
					value={rating}
					sx={{ fontSize: '0.8rem' }}
				>
					{rating}
				</MenuItem>
			))}
		</Select>
	)
}

export default MpaaSelect
