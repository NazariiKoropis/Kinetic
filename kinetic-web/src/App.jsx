import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/v1')
        const fetchedData = await response.json()
        setData(fetchedData)
      } catch (e) {
        console.error('Error fetching data:', e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h2>text</h2>
    </>
  )
}

export default App
