import { Icon } from '@iconify/react'
import { addGrid } from '../../services/gridService'
import { useDataContext } from '../providers/DataProvider'

export default function ImageUploader({ loading, setLoading }) {
  const { setImage } = useDataContext()

  const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'avif']

  const handleFileUpload = async () => {
    const fileToUpload = doicument.getElementById('image-uploader').files[0]

    if (!fileToUpload) {
      alert('Please choose an image file to upload.')
      return
    }

    if (!imageFormats.includes(fileToUpload.name.split('.')[1])) {
      alert('File type not supported! Please upload a valid image file.')
      return
    }

    setLoading(true)

    const reader = new FileReader()

    reader.onload = async (event) => {
      try {
        const image = event.target.result

        setImage(image)
        setLoading(false)
      } catch (error) {
        alert('Invalid JSON file.')
        console.error(error)
      }
    }

    reader.readAsText(fileToUpload)
  }
  return (
    <div className="flex justify-between w-full">
      <input type="file" className="file-input" id="image-uploader" />

      <button className="btn btn-neutral ml-3" onClick={handleFileUpload}>
        <Icon
          icon={loading ? 'line-md:loading-loop' : 'material-symbols:upload'}
          className="text-2xl cursor-pointer"
        />{' '}
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>

      <button onClick={handleFileUpload}></button>
    </div>
  )
}
