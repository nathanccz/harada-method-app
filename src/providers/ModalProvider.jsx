import { createContext, useContext, useEffect, useState } from 'react'
import Modal from '../components/Modal'
import CreateModal from '../components/CreateModal'
import data from '../../data.json'
import { addGrid } from '../../services/gridService'

export const ModalProviderContext = createContext(null)

export default function ModalProvider({ children }) {
  const openCreateModal = () => {
    document.getElementById('create_modal').showModal()
  }
  const createProject = async (title, description) => {
    if (!title) {
      alert('Please enter a title.')
      return
    }

    const newGrid = { ...data }
    newGrid.title = title
    newGrid.description = description
    console.log(newGrid)

    try {
      const response = await addGrid(newGrid)
      const data = await response.json()

      if (data) {
        alert('added!')
      }
    } catch (error) {
      console.log(error)
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
