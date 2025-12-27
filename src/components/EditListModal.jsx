import { editGridCell } from '../../services/gridService'
import { useDataContext } from '../providers/DataProvider'
import { useToastContext } from '../providers/ToastProvider'

export default function EditListModal({ indexOfGrid, currentParams }) {
  const { grids, fetchGrids } = useDataContext()
  const { showToast } = useToastContext()

  let currentPillar

  if (currentParams) {
    currentPillar = grids?.filter((grid) => grid._id === currentParams)[0]
      .grids[indexOfGrid]
  }

  const handleTaskInputChange = (event) => {
    const index = [...currentPillar].findIndex(
      (cell) => cell.id === event.target.name
    )

    currentPillar[index] = { ...currentPillar[index], text: event.target.value }
  }

  const handleTitleInputChange = (event) => {
    currentPillar[4].text = event.target.value
  }

  const handleClickSave = async () => {
    const newGrid = grids.filter((grid) => grid._id === currentParams)[0].grids
    newGrid[indexOfGrid] = currentPillar

    if (indexOfGrid === 4) {
      //If it's the main goal pillar, fill in the other grids accordingly
      for (let i = 0; i < 9; i++) {
        if (i === 4) continue
        newGrid[i][4].text = currentPillar[i].text
      }
    }

    //Set createdAt to empty string if the text field is also empty
    //This helps prevent the list view from retaining the completed check mark
    //when the text field is empty
    for (let i = 0; i < 8; i++) {
      const cell = newGrid[indexOfGrid][i]

      if (!cell.text) {
        newGrid[indexOfGrid][i].completedAt = ''
      }
    }

    try {
      const response = await editGridCell(currentParams, newGrid)
      if (!response.message) {
        console.log('Something went wrong')
      } else {
        showToast(response.message)
        fetchGrids()
      }
    } catch (error) {
      console.log('Error updating grid:', error)
    }
  }

  return (
    <dialog id="edit_list_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Edit Grid Cells</h3>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mx-auto mb-5">
          <legend className="fieldset-legend">Grid cells</legend>

          <label className="label">Main Goal</label>
          <input
            type="text"
            className="input w-full"
            placeholder="New grid title"
            defaultValue={currentPillar && currentPillar[4].text}
            name={currentPillar && currentPillar[4].id}
            onChange={handleTitleInputChange}
          />

          <label className="label">Tasks</label>
          {currentPillar &&
            [...currentPillar.slice(0, 4), ...currentPillar.slice(5)].map(
              (cell, ind) => (
                <div className="flex gap-3" key={cell.id}>
                  <div className="flex items-center text-lg">
                    {(ind + 1).toString()}.
                  </div>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="New task"
                    defaultValue={cell.text}
                    name={cell.id}
                    onChange={handleTaskInputChange}
                  />
                </div>
              )
            )}
        </fieldset>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-success" onClick={handleClickSave}>
              Save Details
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
