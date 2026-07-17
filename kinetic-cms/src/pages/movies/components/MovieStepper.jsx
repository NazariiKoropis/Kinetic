import { Box, Step, StepLabel, Stepper } from '@mui/material'

function MovieStepper({ activeStep, onNext, onPrev }) {
	const steps = ['Textual Information', 'Media & Uploads']

	const handleStepClick = targetIndex => {
		if (targetIndex === activeStep) return

		if (targetIndex > activeStep) {
			onNext()
		} else {
			onPrev()
		}
	}

	return (
		<Box
			component="section"
			sx={{
				mb: 5,
				p: 3,
				backgroundColor: 'background.paper',
				borderRadius: 2,
				border: '1px solid rgba(255, 255, 255, 0.1)',
				boxSizing: 'border-box',

				'& .MuiStepLabel-root': {
					cursor: 'pointer',
					'&:hover .MuiStepIcon-root': {
						transform: 'scale(1.08)',
						color:
							activeStep === 0 ? 'primary.light' : 'rgba(255, 255, 255, 0.3)'
					}
				},

				'& .MuiStepIcon-root': {
					color: 'rgba(255, 255, 255, 0.15)',
					fontSize: '1.4rem',
					transition: 'all 0.2s ease-in-out',

					'&.Mui-active': {
						color: 'primary.main',
						transform: 'scale(1.1)',
						'& .MuiStepIcon-text': {
							fill: '#fff',
							fontWeight: 700
						}
					},

					'&.Mui-completed': {
						color: 'success.main'
					}
				},

				'& .MuiStepLabel-label': {
					color: 'text.secondary',
					fontSize: '0.85rem',
					fontWeight: 500,
					transition: 'color 0.2s ease',

					'&.Mui-active': {
						color: 'text.primary',
						fontWeight: 600
					},
					'&.Mui-completed': {
						color: 'text.secondary'
					}
				},

				'& .MuiStepConnector-line': {
					borderColor: 'rgba(255, 255, 255, 0.1)',
					transition: 'border-color 0.3s ease'
				},
				'& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
					borderColor: 'primary.main'
				},
				'& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
					borderColor: 'success.main'
				}
			}}
		>
			<Stepper
				activeStep={activeStep}
				alternativeLabel
			>
				{steps.map((label, index) => (
					<Step key={index}>
						<StepLabel onClick={() => handleStepClick(index)}>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Box>
	)
}

export default MovieStepper
