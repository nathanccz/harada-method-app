import { Icon } from '@iconify/react'
import JsonDownloader from './JsonDownloader'

import { useState } from 'react'
import { markGridAsCompleted } from '../../services/gridService'
import { useToastContext } from '../providers/ToastProvider'
import { useDataContext } from '../providers/DataProvider'
import { NavLink } from 'react-router-dom'
import { PDFDownloadLink } from '@react-pdf/renderer'
import MyDocument from './MyDocument'
import { useAuthContext } from '../providers/AuthContextProvider'

export default function Dropdown({ gridData }) {
  const [loading, setLoading] = useState(false)
  const { showToast } = useToastContext()
  const { fetchGrids } = useDataContext()
  const { token } = useAuthContext()

  const handleClickSaveAsCompleted = async () => {
    if (gridData.completedAt) return

    setLoading(true)
    try {
      const response = await markGridAsCompleted(gridData._id, token)
      setLoading(true)
      showToast('Grid saved successfully!')
      setLoading(false)
      fetchGrids()
    } catch (error) {
      console.log('Error marking grid as completed:', error)
    }
  }

  const handleClickSaveAsTemplate = async () => {
    document.getElementById('template_modal').showModal()
  }
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        <Icon icon="material-symbols:save" className="text-lg" /> Save
      </div>
      <ul
        tabIndex="-1"
        className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        {/* <li>
          <a onClick={handleClickSaveAsTemplate}>
            <Icon icon="material-symbols:cloud" className="text-lg" />
            Save as Template
          </a>
        </li> */}
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
          {gridData && (
            <PDFDownloadLink
              document={<MyDocument gridData={gridData} />}
              fileName={`${gridData.title || 'harada-grid'}.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  <div className="flex gap-2">
                    <Icon icon="teenyicons:pdf-outline" className="text-lg" />{' '}
                    Generating PDF...
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Icon icon="teenyicons:pdf-outline" className="text-lg" />{' '}
                    Save as PDF
                  </div>
                )
              }
            </PDFDownloadLink>
          )}
        </li>
        <li>
          <JsonDownloader gridData={gridData} />
        </li>
      </ul>
    </div>
  )
}
