import { Icon } from '@iconify/react'
import { addGrid } from '../../services/gridService'
import { useToastContext } from '../providers/ToastProvider'
import { useDataContext } from '../providers/DataProvider'
import { useAuthContext } from '../providers/AuthContextProvider'
import { useState } from 'react'

export default function FileUploader() {
  const [loading, setLoading] = useState(false)

  const { showToast } = useToastContext()
  const { fetchGrids } = useDataContext()
  const { token } = useAuthContext()

  const handleFileUpload = async () => {
    const fileToUpload = document.getElementById('json-uploader').files[0]

    if (!fileToUpload) {
      alert('Please choose a JSON file to upload.')
      return
    }

    if (!fileToUpload.name.endsWith('json')) {
      alert('File type not supported! Please upload a JSON file.')
      return
    }

    setLoading(true)

    const reader = new FileReader()

    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result)
        const response = await addGrid(json, token)
        if (response.message) {
          setLoading(false)
          document.getElementById('create_modal').close()
          showToast('Grid successfully uploaded!')
          fetchGrids()
        }
      } catch (error) {
        alert('Invalid JSON file.')
        console.error(error)
      }
    }

    reader.readAsText(fileToUpload)
  }
  return (
    <div className="flex justify-between w-full">
      <input type="file" className="file-input" id="json-uploader" />

      <button className="btn btn-neutral ml-3" onClick={handleFileUpload}>
        <Icon
          icon={loading ? 'line-md:loading-loop' : 'material-symbols:upload'}
          className="text-2xl cursor-pointer"
        />{' '}
        {loading ? 'Uploading...' : 'Upload JSON'}
      </button>

      <button onClick={handleFileUpload}></button>
    </div>
  )
}
