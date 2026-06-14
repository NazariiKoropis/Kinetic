import { Box, Button, Paper, Typography } from '@mui/material'
import { useAuthStore } from '@store/authStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'

const StyledLogo = styled('img')({
  width: '300px',
  maxWidth: '100%',
  borderRadius: '32px',
})

function Login() {
  const login = useAuthStore((state) => state.login)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const navigate = useNavigate()

  const handleTestLogin = () => {
    login({ name: 'Ivan Admin', role: 'admin' }, 'test-jwt-token')
    navigate('/')
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
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <a
          href="http://localhost:5173/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <StyledLogo src="logo.png" alt="Kinetic CMS Logo" />
        </a>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            letterSpacing: '1px',
            color: 'text.primary',
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
          border: '1px solid #2d2845',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            letterSpacing: '1px',
            color: 'text.primary',
          }}
        >
          Вхід в Kinetic CMS
        </Typography>

        <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
          Тимчасова тестова сторінка перед підключенням форми запитів
        </Typography>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleTestLogin}
          sx={{ height: 52 }}
        >
          Увійти як Адмін (Тест)
        </Button>
      </Paper>
    </Box>
  )
}

export default Login
