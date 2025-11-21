import { useState } from 'react'
import './App.css'
import { Icon } from '@iconify/react/dist/iconify.js'
import Grid from './components/Grid'
import Footer from './components/Footer'
import data from '../data.json'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-between mt-5">
        <h1 className="text-3xl font-bold mb-3">My Grid</h1>

        <Grid data={data} />
        <Footer />
      </main>
    </>
  )
}

export default App
