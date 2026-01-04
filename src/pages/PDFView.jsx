import { PDFViewer } from '@react-pdf/renderer'
import MyDocument from '../components/MyDocument'
import { useDataContext } from '../providers/DataProvider'
import { useParams } from 'react-router-dom'

export default function PDFView() {
  const { id } = useParams()
  const { grids } = useDataContext()

  const gridData = grids.find((grid) => grid._id === id)

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <MyDocument gridData={gridData} />
    </PDFViewer>
  )
}
