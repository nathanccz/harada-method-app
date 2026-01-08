import { Icon } from '@iconify/react'
import { useState } from 'react'
import { getAIGeneratedGrid } from '../../services/gridService'
import { useDataContext } from '../providers/DataProvider'
import { useToastContext } from '../providers/ToastProvider'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../providers/AuthContextProvider'

export default function GenerateGridModal() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { setShouldAnimate, setNewAIGeneratedGridId } = useDataContext()
  const { showToast } = useToastContext()
  const { token } = useAuthContext()

  const handleUserInput = (event) => {
    setMessage(event.target.value)
  }

  const handleClickInput = (event) => {
    setGridType(event.target.value)
  }

  const handleClickGenerateGrid = async () => {
    setLoading(true)
    try {
      const response = await getAIGeneratedGrid(message, token)

      if (response?.error) {
        alert(response.error)
        setLoading(false)
        return
      }

      const id = response.grid._id

      document.getElementById('generate_grid_modal').close()
      setLoading(false)
      showToast('Grid successfully created!')
      setShouldAnimate(true)
      setNewAIGeneratedGridId(id)
    } catch (error) {
      console.log('Error generating grid:', error)
    }
  }

  return (
    <dialog id="generate_grid_modal" className="modal">
      <div className="modal-box text-white bg-primary p-10">
        {!loading ? (
          <>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl">
                ✕
              </button>
            </form>
            <div className="flex gap-3 items-center justify-center">
              <Icon icon="flat-color-icons:idea" className="text-3xl" />
              <h3 className="font-bold text-xl">What's Your Dream Goal?</h3>
            </div>
            <p className="py-4 text-left">
              Tell us what you'd like to achieve, and we'll help you generate a
              custom Harada grid. The more specific you are about your goals,
              the higher quality your grid will be!
            </p>
            <textarea
              placeholder="Ex: 'I want to plan a trip to Greece focusing on amazing culinary experiences.'"
              className="textarea textarea-lg w-full bg-base-200 text-black mt-4 mb-7"
              onChange={handleUserInput}
              value={message}
            ></textarea>

            <div className="flex justify-end">
              <button
                className="btn btn-neutral"
                onClick={handleClickGenerateGrid}
              >
                <Icon icon="si:ai-fill" className="text-lg" />
                Generate My Grid
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center gap-3 p-12">
            <h1>
              <span className="loading loading-bars loading-xl"></span> Creating
              Grid
            </h1>
          </div>
        )}
      </div>
    </dialog>
  )
}
