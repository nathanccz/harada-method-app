import { createContext, useContext, useEffect, useState } from 'react'
import Modal from '../components/Modal'
import CreateModal from '../components/CreateModal'
import data from '../../data.json'
import {
  addGrid,
  clearGridCells,
  deleteGrid,
  editGridDetails,
} from '../../services/gridService'
import { useToastContext } from './ToastProvider'
import DeleteModal from '../components/DeleteModal'
import EditDetailsModal from '../components/EditDetailsModal'
import EditListModal from '../components/EditListModal'
import ClearModal from '../components/ClearModal'

export const ModalProviderContext = createContext(null)

export default function ModalProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const { showToast } = useToastContext()
  const [gridToDelete, setGridToDelete] = useState(null)
  const [gridToEdit, setGridToEdit] = useState(null)
  const [indexOfGrid, setIndexOfGrid] = useState(null)
  const [gridToClear, setGridToClear] = useState(null)
  const [currentParams, setCurrentParams] = useState(null)

  const openCreateModal = () => {
    document.getElementById('create_modal').showModal()
  }

  const openDeleteModal = (gridId) => {
    setGridToDelete(gridId)
    document.getElementById('delete_modal').showModal()
  }

  const openEditDetailsModal = (gridId) => {
    setGridToEdit(gridId)
    document.getElementById('edit_details_modal').showModal()
  }
  const openEditListModal = (index) => {
    setIndexOfGrid(index)
    document.getElementById('edit_list_modal').showModal()
  }

  const openClearModal = (gridId) => {
    setGridToClear(gridId)
    document.getElementById('clear_modal').showModal()
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

  const editDetails = async (title, description) => {
    try {
      const response = await editGridDetails(gridToEdit, title, description)
      console.log(response)
      setGridToEdit(null)
      showToast('Grid details updated!')
    } catch (error) {
      console.log('Error editing grid details:', error)
    }
  }

  const clearGrid = async () => {
    try {
      const response = await clearGridCells(gridToClear)
      setGridToEdit(null)
      showToast('Grid cleared!')
    } catch (error) {
      console.log('Error clearing grid:', error)
    }
  }

  const editList = async () => {
    try {
    } catch (error) {
      console.log('Error editing list:', error)
    }
  }
  return (
    <ModalProviderContext.Provider
      value={{
        openCreateModal,
        openDeleteModal,
        openEditDetailsModal,
        openEditListModal,
        openClearModal,
        setCurrentParams,
      }}
    >
      {children}
      <CreateModal
        createProject={createProject}
        loading={loading}
        setLoading={setLoading}
      />
      <DeleteModal gridToDelete={gridToDelete} removeGrid={removeGrid} />
      <EditDetailsModal gridToEdit={gridToEdit} editDetails={editDetails} />
      <EditListModal indexOfGrid={indexOfGrid} currentParams={currentParams} />
      <ClearModal clearGrid={clearGrid} />
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
