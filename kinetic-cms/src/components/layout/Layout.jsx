//router-dom
import { Outlet } from 'react-router-dom'

//components

function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      <main style={{ flex: '1' }}>{<Outlet />}</main>
    </div>
  )
}

export default Layout
