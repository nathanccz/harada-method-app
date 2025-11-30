import { createContext, useContext, useEffect, useState } from 'react'
import Modal from '../components/Modal'
import CreateModal from '../components/CreateModal'
import data from '../../data.json'

export const ModalProviderContext = createContext(null)

export default function ModalProvider({ children }) {
  const openCreateModal = () => {
    document.getElementById('create_modal').showModal()
  }
  const createProject = (title, description) => {
    if (!title) {
      alert('Please enter a title.')
      return
    }
    const grids = JSON.parse(localStorage.getItem('saved_grids'))
    const newGrid = { ...data }
    newGrid.title = title
    newGrid.description = description
    newGrid.createdAt = new Date().toISOString()

    if (!grids) {
      localStorage.setItem('saved_grids', JSON.stringify([newGrid]))
    } else {
      grids.push(newGrid)
      localStorage.setItem('saved_grids', JSON.stringify(grids))
    }
  }

  return (
    <ModalProviderContext.Provider value={{ openCreateModal }}>
      {children}
      <CreateModal createProject={createProject} />
    </ModalProviderContext.Provider>
  )
}

export function useModalContext() {
  const context = useContext(ModalProviderContext)

  if (!context) {
    throw new Error(
      'useModalContext must be used within a ModalContextProvider'
    )
  }

  return context
}
