//components
import SideBar from '@layout/SideBar'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'row' }}>
      <>
        <SideBar />

        <Box
          compoments="main"
          sx={{
            display: 'flex',
            flexGrow: 1,
            p: 4,
            bgcolor: 'Background.default',
          }}
        >
          <Outlet />
        </Box>
      </>
    </Box>
  )
}

export default Layout
