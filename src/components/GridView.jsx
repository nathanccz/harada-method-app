import { useState, useEffect } from 'react'
import Grid from './Grid'
import Overview from './Overview'
import { formatDate } from '../../utils/helpers'
import { Icon } from '@iconify/react/dist/iconify.js'
import Dropdown from './Dropdown'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useModalContext } from '../providers/ModalProvider'
import { useDataContext } from '../providers/DataProvider'
import OverallProgressCircle from './OverallProgressCircle'
import GridCardDropdown from './GridCardDropdown'

export default function GridView() {
  const [view, setView] = useState('')
  const [loading, setLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const { openClearModal, openUseTemplateModal, newGridId, setNewGridId } =
    useModalContext()
  const { newTemplateCreated, setNewTemplateCreated } = useDataContext()
  const { id } = useParams()
  const { isMobile } = useOutletContext()

  const { templates, grids, shouldAnimate, setShouldAnimate } = useDataContext()

  const navigate = useNavigate()

  const gridData =
    grids.filter((grid) => grid._id === id)[0] ||
    templates.filter((template) => template._id === id)[0]

  const switchView = (newView) => {
    if (newView === view) return

    localStorage.setItem('view_preference', newView)
    setIsAnimating(true)
    setTimeout(() => {
      setView(newView)
      setIsAnimating(false)
    }, 150)
  }

  const handleClickUseTemplate = () => {
    openUseTemplateModal(gridData)
  }

  useEffect(() => {
    const viewPreference = localStorage.getItem('view_preference')

    setView(viewPreference)
  }, [])

  useEffect(() => {
    if (!newTemplateCreated) return

    navigate(`/dashboard/grid/${newGridId}`)
    setNewGridId(false)
    setNewTemplateCreated(false)
  }, [newTemplateCreated])

  return (
    <>
      <section className="flex flex-col gap-5 basis-4/5">
        {/* TITLE AREA */}

        <div className="relative w-fit rounded p-2 text-center flex flex-col md:flex-row gap-5">
          {gridData?.gridType === 'project' && !gridData.templateCategory && (
            <div>
              <OverallProgressCircle
                gridsArray={gridData?.grids}
                size="4rem"
                completed={gridData?.completedAt}
              />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-left mb-2">
              {gridData?.title || 'Untitled'}
            </h1>
            <p className="text-left">{gridData?.description || ''}</p>
          </div>
        </div>

        {/* TOP CONTROLS */}
        <div
          className={`w-full flex gap-3 ${
            !isMobile && 'justify-between'
          } items-center`}
        >
          {!isMobile && (
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
          )}
          {gridData?.templateCategory ? (
            <>
              <button
                className="btn btn-primary"
                onClick={handleClickUseTemplate}
              >
                Use Template
              </button>
            </>
          ) : (
            <div>
              <button
                className="btn btn-neutral"
                onClick={() => openClearModal(gridData._id)}
              >
                <Icon icon="ix:clear" className="text-lg" /> Clear
              </button>
              <Dropdown gridData={gridData} />
              <GridCardDropdown gridId={gridData?._id} />
            </div>
          )}
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
          {view === 'grid' && !isMobile ? (
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
              shouldAnimate={shouldAnimate}
              setShouldAnimate={setShouldAnimate}
            />
          )}
        </div>
      </section>
    </>
  )
}
