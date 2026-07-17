import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { movieCreateSchema } from '@schemas/movie'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import MovieStepper from './components/MovieStepper'
import DetailsStep from './components/form-steps/DetailsStep'
import MediaStep from './components/form-steps/MediaStep'

function MovieFormPage() {
	const { id } = useParams()
	const isEditing = Boolean(id)
	const [activeStep, setActiveStep] = useState(0)

	const {
		register,
		handleSubmit,
		trigger,
		control,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: zodResolver(movieCreateSchema),
		mode: 'onChange'
	})

	const handleNextStep = async () => {
		if (activeStep === 0) {
			const fieldsToValidate = [
				'title',
				'originalTitle',
				'releaseYear',
				'duration',
				'description',
				'director',
				'genres',
				'countries',
				'studios',
				'status',
				'ratingMPAA',
				'trailer'
			]

			const isStepValid = await trigger(fieldsToValidate)

			if (isStepValid) {
				setActiveStep(1)
			}
		}
	}

	const handlePrevStep = () => {
		if (activeStep === 1) setActiveStep(0)
	}

	const onSubmit = data => {
		console.log('Final Clean JSON for Backend:', data)
	}

	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: { xl: 100, md: 'none' },
				margin: '0 auto',
				py: 2
			}}
		>
			<MovieStepper
				activeStep={activeStep}
				onNext={handleNextStep}
				onPrev={handlePrevStep}
			/>

			<Card
				component="section"
				sx={{
					backgroundColor: 'background.paper',
					padding: { xs: 3, sm: 4 },
					borderRadius: 2,
					border: '1px solid rgba(255, 255, 255, 0.1)',
					boxSizing: 'border-box'
				}}
			>
				<Typography
					variant="h5"
					component="h1"
					sx={{ fontWeight: 700, mb: 4, letterSpacing: '-0.01em' }}
				>
					{isEditing ? '🎛 Edit Movie Profile' : '🎬 Create New Movie Entry'}
				</Typography>

				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<Box sx={{ minHeight: 300, mb: 4 }}>
						{activeStep === 0 ? (
							<DetailsStep
								register={register}
								control={control}
								errors={errors}
							/>
						) : (
							<MediaStep
								register={register}
								errors={errors}
							/>
						)}
					</Box>

					<Stack
						direction="row"
						sx={{
							pt: 3,
							borderTop: '1px solid rgba(255, 255, 255, 0.1)',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						<Button
							disabled={activeStep === 0 || isSubmitting}
							onClick={handlePrevStep}
							variant="outlined"
							color="inherit"
							sx={{ textTransform: 'none', fontWeight: 600 }}
						>
							Back
						</Button>

						{activeStep === 0 ? (
							<Button
								onClick={handleNextStep}
								variant="contained"
								color="primary"
								sx={{ textTransform: 'none', fontWeight: 600, px: 4 }}
							>
								Next Step
							</Button>
						) : (
							<Button
								type="submit"
								disabled={isSubmitting}
								variant="contained"
								color="success"
								sx={{ textTransform: 'none', fontWeight: 600, px: 4 }}
							>
								{isSubmitting
									? 'Saving...'
									: isEditing
										? 'Save Movie'
										: 'Publish Movie'}
							</Button>
						)}
					</Stack>
				</Box>
			</Card>
		</Box>
	)
}

export default MovieFormPage
