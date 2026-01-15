import { Icon } from '@iconify/react'
import JsonDownloader from './JsonDownloader'
import { PDFDownloadLink } from '@react-pdf/renderer'
import MyDocument from './MyDocument'

export default function Dropdown({ gridData }) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        <Icon icon="material-symbols:save" className="text-lg" /> Download
      </div>
      <ul
        tabIndex="-1"
        className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
      >
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
                    Download PDF
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
