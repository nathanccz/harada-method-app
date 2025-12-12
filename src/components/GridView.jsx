import { useState, useEffect } from 'react'
import Grid from './Grid'
import Overview from './Overview'
import { formatDate } from '../../utils/helpers'
import FileUploader from './FileUploader'
import { Icon } from '@iconify/react/dist/iconify.js'
import Dropdown from './Dropdown'
import Toast from './Toast'
import { useParams } from 'react-router-dom'
import { useModalContext } from '../providers/ModalProvider'
import { useDataContext } from '../providers/DataProvider'
import OverallProgressCircle from './OverallProgressCircle'

export default function GridView() {
  const [view, setView] = useState('')
  const [titleHovered, setTitleHovered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const { openEditDetailsModal, openClearModal } = useModalContext()
  const { id } = useParams()
  const { grids } = useDataContext()

  const gridData = grids.filter((grid) => grid._id === id)[0]

  const switchView = (newView) => {
    if (newView === view) return

    localStorage.setItem('view_preference', newView)
    setIsAnimating(true)
    setTimeout(() => {
      setView(newView)
      setIsAnimating(false)
    }, 150)
  }

  useEffect(() => {
    const viewPreference = localStorage.getItem('view_preference')

    setView(viewPreference)
  }, [])

  return (
    <>
      <main className="flex flex-col gap-5 p-6 basis-4/5">
        {/* TITLE AREA */}

        <div
          className="relative w-fit rounded hover:bg-gray-300 duration-100 p-2 text-center flex gap-5"
          onMouseEnter={() => setTitleHovered(true)}
          onMouseLeave={() => setTitleHovered(false)}
        >
          {titleHovered && (
            <Icon
              icon="material-symbols:edit-outline"
              className="text-2xl cursor-pointer absolute top-0 right-0"
              onClick={() => openEditDetailsModal(id)}
            />
          )}

          {gridData?.gridType === 'project' && (
            <OverallProgressCircle
              gridsArray={gridData?.grids}
              size="4rem"
              completed={gridData?.completedAt}
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-left mb-2">
              {gridData?.title || 'Untitled'}
            </h1>
            <p className="text-left">{gridData?.description || ''}</p>
          </div>
        </div>

        {/* TOP CONTROLS */}
        <div className="w-full flex gap-3 justify-between items-center">
          <div role="tablist" className="tabs tabs-border">
            <a
              role="tab"
              className={`tab ${view === 'grid' ? '' : 'tab-active'}`}
              onClick={() => switchView('list')}
            >
              List View
            </a>
            <a
              role="tab"
              className={`tab ${view === 'grid' ? 'tab-active' : ''}`}
              onClick={() => switchView('grid')}
            >
              Grid View
            </a>
          </div>
          <div>
            <button
              className="btn btn-neutral"
              onClick={() => openClearModal(gridData._id)}
            >
              <Icon icon="ix:clear" className="text-lg" /> Clear
            </button>
            <Dropdown gridData={gridData} />
          </div>
        </div>
        {/* LAST MODIFIED */}
        {gridData?.lastModified && !gridData?.completedAt && (
          <span className="text-xs italic">
            Last modified: {formatDate(gridData.lastModified)}
          </span>
        )}
        {/* COMPLETED AT */}
        {gridData?.completedAt && (
          <span className="text-xs italic">
            Completed on: {formatDate(gridData.completedAt)}
          </span>
        )}
        <div
          className={`transition-opacity duration-300 ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {view === 'grid' ? (
            <Grid
              switchView={switchView}
              gridData={gridData}
              loading={loading}
            />
          ) : (
            <Overview
              switchView={switchView}
              gridData={gridData}
              loading={loading}
            />
          )}
        </div>
      </main>
    </>
  )
}
