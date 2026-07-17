import { Autocomplete, Chip, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

function EntityAutocomplete({
	value = [],
	onChange,
	error,
	helperText,
	fullWidth = true,
	fetchData,
	label,
	placeholder,
	id
}) {
	const [options, setOptions] = useState([])

	useEffect(() => {
		fetchData()
			.then(res => {
				if (res && res.success && Array.isArray(res.data)) {
					setOptions(res.data)
				} else if (Array.isArray(res)) {
					setOptions(res)
				}
			})
			.catch(err => console.error(`Error fetching data for ${label}:`, err))
	}, [fetchData, label])

	const selectedValues = value.map(idVal => options.find(o => o._id === idVal)).filter(Boolean)

	return (
		<Autocomplete
			multiple
			id={id}
			options={options}
			getOptionLabel={option => option.name || ''}
			value={selectedValues}
			onChange={(event, newValue) => {
				const newIds = newValue.map(item => item._id)
				onChange({ target: { value: newIds } })
			}}
			isOptionEqualToValue={(option, val) => option._id === val._id}
			renderOption={(props, option) => {
				const { key, ...optionProps } = props
				return (
					<li
						key={option._id}
						{...optionProps}
					>
						{option.name}
					</li>
				)
			}}
			renderInput={params => (
				<TextField
					{...params}
					label={label}
					placeholder={placeholder}
					size="small"
					error={error}
					helperText={helperText}
					fullWidth={fullWidth}
				/>
			)}
			renderValue={tagValue =>
				tagValue.map(option => (
					<Chip
						key={option._id}
						label={option.name}
						size="small"
						color="primary"
						onDelete={e => {
							e.stopPropagation()
							const newValue = value.filter(val => val !== option._id)
							onChange({ target: { value: newValue } })
						}}
						onMouseDown={e => {
							e.stopPropagation()
						}}
						sx={{
							backgroundColor: 'primary.main',
							margin: '0.2rem',
							color: '#fff',
							'& .MuiChip-deleteIcon': {
								color: 'rgba(255, 255, 255, 0.7)',
								'&:hover': {
									color: '#fff'
								}
							}
						}}
					/>
				))
			}
		/>
	)
}

export default EntityAutocomplete
