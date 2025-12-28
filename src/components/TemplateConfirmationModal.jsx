import { useState } from 'react'
import { addGrid } from '../../services/gridService'
import { useModalContext } from '../providers/ModalProvider'
import { useToastContext } from '../providers/ToastProvider'
import { useNavigate } from 'react-router-dom'
import { useDataContext } from '../providers/DataProvider'

export default function TemplateConfirmationModal({ template, setTemplate }) {
  const { setNewGridId } = useModalContext()
  const { fetchGrids } = useDataContext()
  const [loading, setLoading] = useState(false)
  const { showToast } = useToastContext()

  const handleClickProceed = async () => {
    setLoading(true)

    const cleanTemplate = {
      title: template.title,
      description: template.description,
      gridType: 'project',
      grids: template.grids,
      lastModified: null,
      completedAt: null,
    }

    try {
      const response = await addGrid(cleanTemplate)

      if (response.message) {
        showToast(response.message)
        setTemplate(null)
        setLoading(false)
        setNewGridId(response.gridId)
        document.getElementById('template_confirmation_modal').close()
        fetchGrids()
      }
    } catch (error) {}
  }
  return (
    <dialog id="template_confirmation_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Use Template?</h3>
        <p className="py-4">
          This will create a new project in your grids collection. You'll be
          able to edit or change any part of this grid once it's in your
          collection.
        </p>
        <div className="flex justify-end">
          {!loading ? (
            <button className="btn btn-primary" onClick={handleClickProceed}>
              Proceed
            </button>
          ) : (
            <button className="btn btn-primary">
              <span className="loading loading-spinner loading-md"></span>{' '}
              Creating grid...
            </button>
          )}
        </div>
      </div>
    </dialog>
  )
}
