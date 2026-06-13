import { Route, Routes } from 'react-router-dom'

//pages public
import Login from '@pages/login'

//components
import Layout from '@layout/Layout'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App
