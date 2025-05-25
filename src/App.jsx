import { useState } from 'react'
import './App.css'
import BinPaste from './components/BinPaste.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BinPaste />
    </>
  )
}

export default App
