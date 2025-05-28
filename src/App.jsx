import { useState } from 'react'
import './App.css'
import BinPaste from './components/BinPaste.jsx'
import { Routes, Route } from 'react-router-dom';
import Paste404 from './components/NotFound.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<BinPaste />} index/>
        <Route path='/bin' element={<BinPaste />} />
        <Route path='/bin/:shortId' element={<BinPaste />} />
        <Route path='/not-found' element={<Paste404 reason='expired' />} />
        <Route path='*' element={<Paste404 />} />
      </Routes>
    </>
  )
}

export default App
