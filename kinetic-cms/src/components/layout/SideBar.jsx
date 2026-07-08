import { logOutUser } from '@api/auth'
import MENU_ITEMS from '@constants/menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import LogoutIcon from '@mui/icons-material/Logout'
import {
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material'
import useAuthStore from '@store/authStore'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const DRAWER_WIDTH_OPEN = { lg: '280px', xl: '340px', xxl: '400px' }
const DRAWER_WIDTH_CLOSED = '72px'

function SideBar() {
	const { logout } = useAuthStore()
	const [isOpen, setIsOpen] = useState(true)

	const handleLogout = () => {
		logOutUser().finally(() => {
			logout()
			navigate('/login')
		})
	}

	const toggleDrawer = () => {
		setIsOpen(!isOpen)
	}

	const currentWidth = isOpen ? DRAWER_WIDTH_OPEN : DRAWER_WIDTH_CLOSED

	return (
		<Drawer
			variant="permanent"
			anchor="left"
			sx={{
				width: currentWidth,
				flexShrink: 0,
				transition: theme =>
					theme.transitions.create('width', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.short
					}),
				'& .MuiDrawer-paper': {
					width: currentWidth,
					boxSizing: 'border-box',
					backgroundColor: 'var(--cms-bg-sidebar)',
					borderRight: '1px solid #2D2845',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					p: 2,
					overflowX: 'hidden',
					position: 'relative',
					transition: theme =>
						theme.transitions.create('width', {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.short
						})
				}
			}}
		>
			<IconButton
				onClick={toggleDrawer}
				sx={{
					position: 'absolute',
					top: '50%',
					right: '8px',
					transform: 'translateY(-50%)',
					backgroundColor: 'var(--cms-bg-main)',
					border: '1px solid #2D2845',
					color: 'var(--cms-text-muted)',
					zIndex: 10,
					width: '32px',
					height: '64px',
					borderRadius: '8px',
					'&:hover': {
						backgroundColor: 'var(--cms-primary)',
						color: 'var(--cms-text-main)'
					}
				}}
			>
				{isOpen ? (
					<ChevronLeftIcon fontSize="small" />
				) : (
					<ChevronRightIcon fontSize="small" />
				)}
			</IconButton>

			<Box>
				<Typography
					variant="h5"
					component="h2"
					sx={{
						textAlign: isOpen ? 'center' : 'left',
						pl: isOpen ? 0 : 1,
						fontWeight: 'bold',
						letterSpacing: '1px',
						color: 'var(--cms-text-main)',
						py: 4,
						height: '40px',
						whiteSpace: 'nowrap'
					}}
				>
					{isOpen ? 'KINETIC CMS' : 'K.'}
				</Typography>

				<Divider sx={{ borderColor: '#2D2845', mb: 2 }} />

				<List sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 0 }}>
					{MENU_ITEMS.map(({ title, icon, path }) => (
						<ListItem
							key={title}
							disablePadding
							sx={{ display: 'block' }}
						>
							<ListItemButton
								component={NavLink}
								to={path}
								end={path === '/'}
								sx={{
									borderRadius: '8px',
									color: 'var(--cms-text-muted)',
									minHeight: 48,
									fontWeight: 'bold',
									justifyContent: isOpen ? 'initial' : 'center',
									px: 2.5,
									'& .MuiListItemIcon-root': {
										color: 'var(--cms-text-muted)',
										minWidth: isOpen ? '40px' : '0',
										mr: isOpen ? 'auto' : 0,
										justifyContent: 'center'
									},
									'&.active': {
										color: 'var(--cms-text-main)',
										borderLeft: isOpen
											? '4px solid var(--cms-primary)'
											: 'none',

										backgroundColor: !isOpen
											? 'rgba(124, 58, 237, 0.3)'
											: 'rgba(124, 58, 237, 0.15)',
										'& .MuiListItemIcon-root': {
											color: 'var(--cms-primary)'
										}
									},
									'&:hover': {
										backgroundColor: 'rgba(124, 58, 237, 0.08)'
									}
								}}
							>
								<ListItemIcon>{icon}</ListItemIcon>

								{isOpen && (
									<ListItemText
										primary={title}
										slotProps={{
											primary: {
												fontWeight: 500,
												fontSize: '0.95rem'
											}
										}}
									/>
								)}
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>

			<Box sx={{ mt: 'auto', pt: 2, textAlign: 'center' }}>
				{isOpen ? (
					<Button
						fullWidth
						variant="outlined"
						color="error"
						onClick={handleLogout}
						sx={{
							height: 46,
							borderRadius: '8px',
							fontWeight: 'bold',
							whiteSpace: 'nowrap'
						}}
					>
						Вийти з системи
					</Button>
				) : (
					<IconButton
						color="error"
						onClick={handleLogout}
						sx={{
							border: '1px solid rgba(239, 68, 68, 0.3)',
							borderRadius: '8px',
							'&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' }
						}}
					>
						<LogoutIcon />
					</IconButton>
				)}
			</Box>
		</Drawer>
	)
}

export default SideBar
