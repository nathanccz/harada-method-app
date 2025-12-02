import { createContext, useContext, useEffect, useState } from 'react'
import Modal from '../components/Modal'
import CreateModal from '../components/CreateModal'
import data from '../../data.json'
import { addGrid, deleteGrid } from '../../services/gridService'
import { useToastContext } from './ToastProvider'
import DeleteModal from '../components/DeleteModal'

export const ModalProviderContext = createContext(null)

export default function ModalProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const { showToast } = useToastContext()
  const [gridToDelete, setGridToDelete] = useState(null)

  const openCreateModal = () => {
    document.getElementById('create_modal').showModal()
  }

  const openDeleteModal = (gridId) => {
    setGridToDelete(gridId)
    document.getElementById('delete_modal').showModal()
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
      showToast(response.message)
    } catch (error) {
      console.log(error)
    }
  }

  const removeGrid = async () => {
    try {
      const response = await deleteGrid(gridToDelete)
      console.log(response)
      setGridToDelete(null)
      showToast('Grid deleted!')
    } catch (error) {
      console.log('Error deleting modal:', error)
    }
  }

  return (
    <ModalProviderContext.Provider value={{ openCreateModal, openDeleteModal }}>
      {children}
      <CreateModal
        createProject={createProject}
        loading={loading}
        setLoading={setLoading}
      />
      <DeleteModal gridToDelete={gridToDelete} removeGrid={removeGrid} />
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
