import { Icon } from '@iconify/react'
import { useModalContext } from '../providers/ModalProvider'
import { NavLink } from 'react-router-dom'

export default function SpeedDial() {
  const { openCreateModal } = useModalContext()
  return (
    <div className="fab">
      {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-lg btn-circle btn-info text-white text-2xl"
      >
        +
      </div>

      {/* close button should not be focusable so it can close the FAB when clicked. It's just a visual placeholder */}
      <div className="fab-close">
        Close{' '}
        <span className="btn btn-circle btn-lg btn-error text-white text-xl">
          ✕
        </span>
      </div>

      {/* buttons that show up when FAB is open */}
      <div className="font-bold">
        Add Grid
        <button className="btn btn-lg btn-circle" onClick={openCreateModal}>
          <Icon icon="qlementine-icons:new-24" className="text-xl" />
        </button>
      </div>
      <div className="font-bold">
        My Grids{' '}
        <NavLink to={'/dashboard/grids'}>
          <button className="btn btn-lg btn-circle">
            {' '}
            <Icon icon="vaadin:grid-small-o" className="text-xl" />
          </button>
        </NavLink>
      </div>
      <div className="font-bold">
        Settings{' '}
        <button className="btn btn-lg btn-circle">
          <Icon icon="uil:setting" className="text-xl" />
        </button>
      </div>
    </div>
  )
}
