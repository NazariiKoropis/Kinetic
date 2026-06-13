// test comment for App.jsx HMR
//libs
import { Route, Routes, Navigate } from 'react-router-dom'

//pages public
import Login from '@pages/login'

//protected
import Dashboard from '@pages/dashboard'
import People from '@pages/people'
import Films from '@pages/films'
import Reports from '@pages/reports'
import ChangeHistory from '@pages/change-history'

//components
import ProtectedRoute from './routes/ProtectedRoute'
import Layout from '@layout/Layout'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/people" element={<People />} />
          <Route path="/films" element={<Films />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/change-history" element={<ChangeHistory />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
