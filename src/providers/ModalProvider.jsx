import { createContext, useContext, useEffect, useState } from 'react'
import CreateModal from '../components/CreateModal'
import data from '../../data.json'
import {
  addGrid,
  deleteGrid,
  editGridDetails,
} from '../../services/gridService'
import { useToastContext } from './ToastProvider'
import DeleteModal from '../components/DeleteModal'
import EditDetailsModal from '../components/EditDetailsModal'
import EditListModal from '../components/EditListModal'
import ClearModal from '../components/ClearModal'
import EditCellModal from '../components/EditCellModal'
import GenerateGridModal from '../components/GenerateGridModal'
import CompletionModal from '../components/CompletionModal'
import TemplateModal from '../components/TemplateModal'
import TemplateConfirmationModal from '../components/TemplateConfirmationModal'

export const ModalProviderContext = createContext(null)

export default function ModalProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const { showToast } = useToastContext()
  const [gridToDelete, setGridToDelete] = useState(null)
  const [gridToEdit, setGridToEdit] = useState(null)
  const [indexOfGrid, setIndexOfGrid] = useState(null)
  const [gridToClear, setGridToClear] = useState(null)
  const [currentParams, setCurrentParams] = useState(null)
  const [cellText, setCellText] = useState(null)
  const [cellToEdit, setCellToEdit] = useState(null)
  const [template, setTemplate] = useState(null)
  const [newGridId, setNewGridId] = useState(null)

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
  const openEditCellModal = (gridId, cellId, text) => {
    setGridToEdit(gridId)
    setCellToEdit(cellId)
    setCellText(text)
    document.getElementById('task_modal').showModal()
  }
  const openEditListModal = (index) => {
    setIndexOfGrid(index)
    document.getElementById('edit_list_modal').showModal()
  }

  const openClearModal = (gridId) => {
    setGridToClear(gridId)
    document.getElementById('clear_modal').showModal()
  }

  const openGenerateGridModal = () => {
    document.getElementById('generate_grid_modal').showModal()
  }

  const openUseTemplateModal = (data) => {
    setTemplate(data)
    document.getElementById('template_confirmation_modal').showModal()
  }

  const createProject = async (
    title,
    description,
    gridType,
    templateCategory
  ) => {
    if (!title) {
      alert('Please enter a title.')
      return
    }
    const newGrid = { ...data }
    newGrid.title = title
    newGrid.description = description
    newGrid.gridType = gridType
    newGrid.templateCategory = templateCategory || ''
    console.log(newGrid)

    try {
      const response = await addGrid(newGrid)
      showToast(response.message)
      return response.message
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

  return (
    <ModalProviderContext.Provider
      value={{
        openCreateModal,
        openEditCellModal,
        openDeleteModal,
        openEditDetailsModal,
        openEditListModal,
        openClearModal,
        openGenerateGridModal,
        openUseTemplateModal,
        setCurrentParams,
        gridToDelete,
        newGridId,
        setNewGridId,
        gridToClear,
        setGridToClear,
      }}
    >
      {children}
      <CreateModal
        createProject={createProject}
        loading={loading}
        setLoading={setLoading}
      />
      <EditCellModal
        cellText={cellText}
        cellToEdit={cellToEdit}
        gridToEdit={gridToEdit}
      />
      <DeleteModal gridToDelete={gridToDelete} removeGrid={removeGrid} />
      <EditDetailsModal gridToEdit={gridToEdit} editDetails={editDetails} />
      <EditListModal indexOfGrid={indexOfGrid} currentParams={currentParams} />
      <ClearModal />
      <GenerateGridModal />
      <CompletionModal />
      <TemplateModal />
      <TemplateConfirmationModal
        template={template}
        setTemplate={setTemplate}
      />
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
