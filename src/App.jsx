import { useState } from 'react'
import './App.css'
import BinPaste from './components/BinPaste.jsx'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<BinPaste />} index/>
        <Route path='/bin' element={<BinPaste />} />
        <Route path='/bin/:shortId' element={<BinPaste />} />
      </Routes>
    </>
  )
}

export default App
