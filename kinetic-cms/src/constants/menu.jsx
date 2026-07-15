import BusinessIcon from '@mui/icons-material/Business'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HistoryIcon from '@mui/icons-material/History'
import MovieIcon from '@mui/icons-material/Movie'
import PeopleIcon from '@mui/icons-material/People'
import PublicIcon from '@mui/icons-material/Public'
import ReportIcon from '@mui/icons-material/Report'
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy'

const MENU_ITEMS = [
	{ title: 'Dashboard', icon: <DashboardIcon />, path: '/' },
	{ title: 'People', icon: <PeopleIcon />, path: '/people' },
	{ title: 'Movies', icon: <MovieIcon />, path: '/movies' },
	{ title: 'Studios', icon: <BusinessIcon />, path: '/studios' },
	{ title: 'Countries', icon: <PublicIcon />, path: '/countries' },
	{ title: 'Genres', icon: <TheaterComedyIcon />, path: '/genres' },
	{ title: 'Reports', icon: <ReportIcon />, path: '/reports' },
	{ title: 'Change History', icon: <HistoryIcon />, path: '/change-history' }
]

export default MENU_ITEMS
