import { Icon } from '@iconify/react'
import { formatFileName } from '../../utils/helpers'
import { useDataContext } from '../providers/DataProvider'
import { useModalContext } from '../providers/ModalProvider'

export default function JsonDownloader({ gridData }) {
  const { grids } = useDataContext()
  const { gridToDelete } = useModalContext()

  const handleDownload = () => {
    let shallowCopy
    if (gridData) {
      shallowCopy = { ...gridData }
    } else {
      shallowCopy = [...grids].filter((grid) => grid._id === gridToDelete)[0]
    }
    console.log(shallowCopy)
    delete shallowCopy._id
    const jsonData = JSON.stringify(shallowCopy)
    const filename = formatFileName(shallowCopy.title)

    if (!jsonData) {
      alert('No JSON data found in local storage.')
      return
    }

    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div onClick={handleDownload} className="flex gap-2 items-center">
      <Icon icon="si:json-duotone" className="text-lg" /> Download JSON
    </div>
  )
}
