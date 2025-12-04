import { useState, useEffect } from 'react'
import Grid from './Grid'
import Overview from './Overview'
import { formatDate } from '../../utils/helpers'
import FileUploader from './FileUploader'
import { Icon } from '@iconify/react/dist/iconify.js'
import Dropdown from './Dropdown'
import Toast from './Toast'
import { useParams } from 'react-router-dom'
import { getSingleGrid } from '../../services/gridService'
import { useModalContext } from '../providers/ModalProvider'

export default function GridView() {
  const [gridView, setGridView] = useState(false)
  const [titleHovered, setTitleHovered] = useState(false)
  const [gridData, setGridData] = useState(null)
  const [focused, setFocused] = useState([])
  const [loading, setLoading] = useState(true)
  const { openEditDetailsModal } = useModalContext()
  const { id } = useParams()

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      try {
        setLoading(true)
        const response = await getSingleGrid(id)
        if (isMounted) {
          setGridData(response[0])
        }
      } catch (err) {
        console.error(err)
      } finally {
        if (isMounted) setLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [id])

  const handleClickEditTitle = () => {
    document.getElementById('title_modal').showModal()
  }

  const handleClickClear = () => {
    document.getElementById('clear_modal').showModal()
  }

  return (
    <>
      <main className="flex flex-col gap-5 mt-5 p-10 basis-4/5">
        {/* TITLE AREA */}
        <div
          className="relative w-fit mx-auto rounded hover:bg-gray-300 duration-100 p-2 text-center"
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

          <h1 className="text-2xl font-bold p-3 text-center">
            {gridData?.title || 'Untitled'}
          </h1>
          <p> {gridData?.description || ''}</p>
        </div>

        {/* LAST MODIFIED */}
        {gridData?.lastModified && (
          <span className="text-sm italic">
            Last modified: {formatDate(gridData.lastModified)}
          </span>
        )}

        {/* TOP CONTROLS */}
        <div className="w-full flex gap-3 justify-between mb-3 items-center">
          <div role="tablist" className="tabs tabs-border">
            <a
              role="tab"
              className={`tab ${gridView ? '' : 'tab-active'}`}
              onClick={() => setGridView(false)}
            >
              Outline
            </a>
            <a
              role="tab"
              className={`tab ${gridView ? 'tab-active' : ''}`}
              onClick={() => setGridView(true)}
            >
              Grid View
            </a>
          </div>
          <div>
            <button className="btn btn-neutral" onClick={handleClickClear}>
              <Icon icon="ix:clear" className="text-lg" /> Clear
            </button>
            <Dropdown />
          </div>
        </div>

        {gridView ? (
          <Grid
            setGridView={setGridView}
            gridData={gridData}
            setGridData={setGridData}
            loading={loading}
            focused={focused}
            setFocused={setFocused}
          />
        ) : (
          <Overview
            setGridView={setGridView}
            gridData={gridData}
            setGridData={setGridData}
            loading={loading}
            focused={focused}
            setFocused={setFocused}
          />
        )}
      </main>
    </>
  )
}
