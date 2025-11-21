import { useState } from 'react'
import './App.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import Grid from './components/Grid'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="relative">
      <Navbar />
      <main className="flex flex-col justify-between mt-5">
        <h1 className="text-2xl font-bold mb-3">Software Engineer Job Goals</h1>

        <Grid />
        <Footer />
      </main>
    </div>
  )
}

export default App
