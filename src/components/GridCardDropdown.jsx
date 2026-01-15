import { Icon } from '@iconify/react/dist/iconify.js'
import { useModalContext } from '../providers/ModalProvider'
import { markGridAsCompleted } from '../../services/gridService'
import { useToastContext } from '../providers/ToastProvider'
import { useDataContext } from '../providers/DataProvider'
import { useAuthContext } from '../providers/AuthContextProvider'
import { useState } from 'react'

export default function GridCardDropdown({ gridId }) {
  const [loading, setLoading] = useState(false)
  const { openDeleteModal, openEditDetailsModal } = useModalContext()
  const { showToast } = useToastContext()
  const { grids, fetchGrids } = useDataContext()
  const { token } = useAuthContext()

  const gridData = grids.find((grid) => grid._id === gridId)

  const handleClickSaveAsCompleted = async () => {
    if (gridData.completedAt) return

    setLoading(true)
    try {
      const response = await markGridAsCompleted(gridId, token)
      setLoading(true)
      showToast('Grid saved successfully!')
      setLoading(false)
      fetchGrids()
    } catch (error) {
      console.log('Error marking grid as completed:', error)
    }
  }
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        <Icon
          icon="mdi:gear-outline"
          className="sm:text-sm mg:text-md lg:text-lg"
        />
      </div>
      <ul
        tabIndex="-1"
        className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          {!loading ? (
            <a onClick={handleClickSaveAsCompleted}>
              <Icon icon="fluent-mdl2:completed" className="text-lg" />
              Save as Completed
            </a>
          ) : (
            <a onClick={handleClickSaveAsCompleted}>
              <span className="loading loading-spinner loading-md"></span>
              Saving...
            </a>
          )}
        </li>
        <li>
          <a onClick={() => openEditDetailsModal(gridId)}>
            <Icon
              icon="material-symbols:edit"
              className="sm:text-sm mg:text-md lg:text-lg"
            />
            Edit Details
          </a>
        </li>
        <li className="text-red-700">
          <a onClick={() => openDeleteModal(gridId)}>
            <Icon
              icon="tabler:trash"
              className="sm:text-sm mg:text-md lg:text-lg"
            />{' '}
            Delete Grid
          </a>
        </li>
      </ul>
    </div>
  )
}
