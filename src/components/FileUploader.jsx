import { Icon } from '@iconify/react'

export default function FileUploader({
  setGridData,
  loading,
  setLoading,
  setToastActive,
  setToastMessage,
}) {
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
        localStorage.setItem('harada_grid', event.target.result)
        await new Promise((res) => setTimeout(res, 2000))
        setGridData(json)
        setLoading(false)
        setToastMessage('Successfully uploaded file!')
        setToastActive(true)
        await new Promise((res) => setTimeout(res, 2000))
        setToastActive(false)
        setToastMessage('')
      } catch (error) {
        alert('Invalid JSON file.')
        console.error(err)
      }
    }

    reader.readAsText(fileToUpload)
  }
  return (
    <div className="flex gap-2">
      <input type="file" className="file-input" id="json-uploader" />
      <button onClick={handleFileUpload}>
        <Icon
          icon={loading ? 'line-md:loading-loop' : 'material-symbols:upload'}
          className="text-2xl cursor-pointer"
        />
      </button>
    </div>
  )
}
