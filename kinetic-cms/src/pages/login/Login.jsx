import { logInUser, logOutUser } from '@api/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { loginSchema } from '@schemas/user'
import { useAuthStore } from '@store/authStore'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const StyledLogo = styled('img')({
	width: '300px',
	maxWidth: '100%',
	borderRadius: '32px'
})

function Login() {
	const [apiError, setApiError] = useState('')
	const login = useAuthStore(state => state.login)
	const isAuthenticated = useAuthStore(state => state.isAuthenticated)
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			username: '',
			password: ''
		},
		resolver: zodResolver(loginSchema)
	})

	const onSubmit = data => {
		logInUser(data)
			.then(res => {
				if (res.user?.role !== 'ROLE_ADMIN') {
					setApiError('Доступ заборонено. Тільки для адміністраторів.')
					logOutUser()
					return
				}
				login(res.user, res.accessToken)
				navigate('/', { replace: true })
			})
			.catch(err => {
				console.log(err)
				if (err.response?.status === 401) {
					setApiError('Неправильний логін або пароль')
				} else {
					setApiError('Помилка авторизації. Спробуйте пізніше.')
				}
			})
	}

	useEffect(() => {
		if (isAuthenticated) navigate('/', { replace: true })
	}, [isAuthenticated, navigate])

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
				gap: 4
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					gap: 2
				}}
			>
				<a
					href="http://localhost:5173/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<StyledLogo
						src="logo.png"
						alt="Kinetic CMS Logo"
					/>
				</a>
				<Typography
					variant="h4"
					sx={{
						fontWeight: 'bold',
						letterSpacing: '1px',
						color: 'text.primary'
					}}
				>
					Client management system
				</Typography>
			</Box>

			<Paper
				elevation={0}
				sx={{
					p: 4,
					textAlign: 'center',
					width: '100%',
					maxWidth: 500,
					bgcolor: 'background.paper',
					border: '1px solid #2d2845'
				}}
			>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						fontWeight: 'bold',
						letterSpacing: '1px',
						color: 'text.primary'
					}}
				>
					Вхід в Kinetic CMS
				</Typography>

				<Typography
					variant="body2"
					sx={{ mb: 4, color: 'text.secondary' }}
				>
					Private admin page. Required admin permi
				</Typography>

				{apiError && (
					<Typography
						variant="body2"
						color="error"
						sx={{ mb: 2, fontWeight: 'bold' }}
					>
						{apiError}
					</Typography>
				)}

				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						width: '100%'
					}}
				>
					<TextField
						fullWidth
						type="text"
						variant="outlined"
						label="Login"
						required
						error={!!errors.username}
						helperText={errors.username?.message}
						{...register('username')}
					/>

					<TextField
						fullWidth
						type="password"
						variant="outlined"
						label="Password"
						required
						error={!!errors.password}
						helperText={errors.password?.message}
						{...register('password')}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={{ height: 52 }}
					>
						Log In
					</Button>
				</Box>
			</Paper>
		</Box>
	)
}

export default Login
