import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

import cmsTheme from '@config/theme.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={cmsTheme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>
)
