import { Icon } from '@iconify/react'

export default function JsonDownloader({ gridData }) {
  const handleDownload = ({ filename = 'downloaded_data.json' }) => {
    delete gridData._id
    const jsonData = JSON.stringify(gridData)

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
    <button onClick={handleDownload}>
      <Icon icon="si:json-duotone" className="text-lg" /> Download JSON
    </button>
  )
}
