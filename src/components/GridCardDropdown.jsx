import { Icon } from '@iconify/react/dist/iconify.js'
import { useModalContext } from '../providers/ModalProvider'
import { NavLink } from 'react-router-dom'

export default function GridCardDropdown({ gridId }) {
  const { openDeleteModal, openEditDetailsModal } = useModalContext()
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
