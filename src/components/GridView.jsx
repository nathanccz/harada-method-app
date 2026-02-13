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
import Drawer from './Drawer'

export default function GridView() {
  const [view, setView] = useState('')
  const [loading, setLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentCell, setCurrentCell] = useState({})
  const { openClearModal, openUseTemplateModal, newGridId, setNewGridId } =
    useModalContext()
  const { newTemplateCreated, setNewTemplateCreated } = useDataContext()
  const { id } = useParams()
  const { isMobile, isPhone } = useOutletContext()
  const [gridData, setGridData] = useState({})
  const {
    templates,
    grids,
    shouldAnimate,
    setShouldAnimate,
    gridsLoaded,
    newlyCreatedGridId,
  } = useDataContext()

  const navigate = useNavigate()

  useEffect(() => {
    if (newlyCreatedGridId) {
      navigate(`/dashboard/grids`)
    }

    const data =
      grids.filter((grid) => grid._id === id)[0] ||
      templates.filter((template) => template._id === id)[0]

    if (gridsLoaded && !data && !shouldAnimate) {
      navigate('/dashboard/grids')
    } //This allows deleted grids to redirect to My Grids, while allowing page refreshes and AI grid animation to stay on grid page.

    setGridData(data)
  }, [grids, id, gridsLoaded])

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
    const viewPreference = localStorage.getItem('view_preference') || 'grid'

    setView(viewPreference)
  }, [])

  useEffect(() => {
    if (!newTemplateCreated) return

    navigate(`/dashboard/grids/${newGridId}`)
    setNewGridId(false)
    setNewTemplateCreated(false)
  }, [newTemplateCreated])

  return (
    <>
      <section className="flex flex-col gap-5 basis-4/5">
        {/* TITLE AREA */}

        <div className="relative w-fit rounded p-5 text-center flex flex-col md:flex-row gap-5">
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
              {gridData?.title || <div className="skeleton h-16 w-96"></div>}
            </h1>
            <p className="text-left">{gridData?.description || ''}</p>
          </div>
        </div>

        {/* TOP CONTROLS */}
        <div
          className={`w-full flex gap-3 px-5 ${
            !isMobile && 'justify-between'
          } items-center`}
        >
          {!isMobile && !isPhone && (
            <div role="tablist" className="tabs tabs-border">
              <a
                role="tab"
                className={`tab ${view === 'grid' ? 'tab-active' : ''}`}
                onClick={() => switchView('grid')}
              >
                Grid View
              </a>
              <a
                role="tab"
                className={`tab ${view === 'grid' ? '' : 'tab-active'}`}
                onClick={() => switchView('list')}
              >
                List View
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
          <span className="text-xs italic px-6">
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
          {view === 'grid' && !isMobile && !isPhone ? (
            <Grid
              switchView={switchView}
              gridData={gridData}
              loading={loading}
              setGridData={setGridData}
              shouldAnimate={shouldAnimate}
              setShouldAnimate={setShouldAnimate}
              setCurrentCell={setCurrentCell}
            />
          ) : (
            <Overview
              switchView={switchView}
              gridData={gridData}
              setGridData={setGridData}
              loading={loading}
              shouldAnimate={shouldAnimate}
              setShouldAnimate={setShouldAnimate}
              setCurrentCell={setCurrentCell}
            />
          )}
        </div>
        <Drawer
          cellData={currentCell}
          gridData={gridData}
          setCurrentCell={setCurrentCell}
        />
      </section>
    </>
  )
}
