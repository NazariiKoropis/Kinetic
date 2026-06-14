import DashboardIcon from '@mui/icons-material/Dashboard'
import HistoryIcon from '@mui/icons-material/History'
import MovieIcon from '@mui/icons-material/Movie'
import PeopleIcon from '@mui/icons-material/People'
import ReportIcon from '@mui/icons-material/Report'

const MENU_ITEMS = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { title: 'People', icon: <PeopleIcon />, path: '/people' },
  { title: 'Films', icon: <MovieIcon />, path: '/films' },
  { title: 'Reports', icon: <ReportIcon />, path: '/reports' },
  { title: 'Change History', icon: <HistoryIcon />, path: '/change-history' },
]

export default MENU_ITEMS
