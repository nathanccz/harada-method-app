export default function ClearModal({ setGridData, template }) {
  const handleClickClear = () => {
    localStorage.removeItem('harada_grid')
    setGridData(template)
  }
  return (
    <dialog id="clear_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Are You Sure?</h3>
        <p className="py-4">
          Clicking "clear" will reset your grid and permanently delete it from
          your local storage.
        </p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn" onClick={handleClickClear}>
              Clear
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
