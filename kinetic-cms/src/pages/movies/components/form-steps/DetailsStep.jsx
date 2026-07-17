import {
	Box,
	FormControl,
	FormHelperText,
	InputLabel,
	TextField
} from '@mui/material'
import EntityAutocomplete from '@ui/EntityAutocomplete'
import MpaaSelect from '@ui/MpaaSelect'
import StatusSelect from '@ui/StatusSelect'
import { getCountries } from '@api/country'
import { getGenres } from '@api/genre'
import { getStudios } from '@api/studio'
import { Controller } from 'react-hook-form'

function DetailsStep({ register, control, errors }) {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', md: 'repeat(6, 1fr)' },
				gap: 3
			}}
		>
			<TextField
				label="Title"
				placeholder="e.g. Neon Horizon"
				size="small"
				{...register('title')}
				error={!!errors.title}
				helperText={errors.title?.message}
				fullWidth
				sx={{ gridColumn: { md: 'span 3' } }}
			/>

			<TextField
				label="Original Title"
				placeholder="e.g. L'Orizzonte Neon"
				size="small"
				{...register('originalTitle')}
				error={!!errors.originalTitle}
				helperText={errors.originalTitle?.message}
				fullWidth
				sx={{ gridColumn: { md: 'span 3' } }}
			/>

			<TextField
				label="Release Year"
				placeholder="2024"
				size="small"
				type="number"
				{...register('releaseYear', { valueAsNumber: true })}
				error={!!errors.releaseYear}
				helperText={errors.releaseYear?.message}
				fullWidth
				sx={{ gridColumn: { md: 'span 2' } }}
			/>

			<TextField
				label="Duration (min)"
				placeholder="120"
				size="small"
				type="number"
				{...register('duration', { valueAsNumber: true })}
				error={!!errors.duration}
				helperText={errors.duration?.message}
				fullWidth
				sx={{ gridColumn: { md: 'span 2' } }}
			/>

			<TextField
				label="Director"
				placeholder="Jane Doe"
				size="small"
				{...register('director')}
				error={!!errors.director}
				helperText={errors.director?.message}
				fullWidth
				sx={{ gridColumn: { md: 'span 2' } }}
			/>

			<Controller
				name="ratingMPAA"
				control={control}
				defaultValue="NR"
				render={({ field }) => (
					<FormControl
						fullWidth
						error={!!errors.ratingMPAA}
						size="small"
						sx={{ gridColumn: { md: 'span 3' } }}
					>
						<InputLabel id="mpaa-select-label">Rating MPAA</InputLabel>
						<MpaaSelect
							value={field.value}
							onChange={e => field.onChange(e.target.value)}
							fullWidth
							labelId="mpaa-select-label"
							label="Rating MPAA"
						/>
						{errors.ratingMPAA && (
							<FormHelperText>{errors.ratingMPAA.message}</FormHelperText>
						)}
					</FormControl>
				)}
			/>

			<Controller
				name="status"
				control={control}
				defaultValue="released"
				render={({ field }) => (
					<FormControl
						fullWidth
						error={!!errors.status}
						size="small"
						sx={{ gridColumn: { md: 'span 3' } }}
					>
						<InputLabel id="status-select-label">Status</InputLabel>
						<StatusSelect
							value={field.value}
							onChange={e => field.onChange(e.target.value)}
							fullWidth
							labelId="status-select-label"
							label="Status"
						/>
						{errors.status && (
							<FormHelperText>{errors.status.message}</FormHelperText>
						)}
					</FormControl>
				)}
			/>

			<Box sx={{ gridColumn: { md: 'span 3' } }}>
				<Controller
					name="genres"
					control={control}
					defaultValue={[]}
					render={({ field }) => (
						<EntityAutocomplete
							value={field.value}
							onChange={e => field.onChange(e.target.value)}
							error={!!errors.genres}
							helperText={errors.genres?.message}
							fullWidth
							fetchData={getGenres}
							label="Genres"
							placeholder="Select genres"
							id="genre-autocomplete"
						/>
					)}
				/>
			</Box>

			<Box sx={{ gridColumn: { md: 'span 3' } }}>
				<Controller
					name="countries"
					control={control}
					defaultValue={[]}
					render={({ field }) => (
						<EntityAutocomplete
							value={field.value}
							onChange={e => field.onChange(e.target.value)}
							error={!!errors.countries}
							helperText={errors.countries?.message}
							fullWidth
							fetchData={getCountries}
							label="Countries"
							placeholder="Select countries"
							id="country-autocomplete"
						/>
					)}
				/>
			</Box>

			<Box sx={{ gridColumn: { md: 'span 3' } }}>
				<Controller
					name="studios"
					control={control}
					defaultValue={[]}
					render={({ field }) => (
						<EntityAutocomplete
							value={field.value}
							onChange={e => field.onChange(e.target.value)}
							error={!!errors.studios}
							helperText={errors.studios?.message}
							fullWidth
							fetchData={getStudios}
							label="Studios"
							placeholder="Select studios"
							id="studio-autocomplete"
						/>
					)}
				/>
			</Box>

			<TextField
				placeholder="https://youtube.com/watch?v=..."
				label="Trailer URL"
				size="small"
				{...register('trailer')}
				error={!!errors.trailer}
				helperText={errors.trailer?.message}
				fullWidth
				sx={{ gridColumn: { md: 'span 3' } }}
			/>

			{/* Row 6 */}
			<TextField
				label="Description"
				placeholder="A brief synopsis of the movie..."
				size="small"
				multiline
				rows={4}
				{...register('description')}
				error={!!errors.description}
				helperText={errors.description?.message}
				fullWidth
				sx={{ gridColumn: { md: 'span 6' } }}
			/>
		</Box>
	)
}

export default DetailsStep
