export default function CompletionModal() {
  return (
    <dialog id="completion_modal" className="modal">
      <div className="modal-box p-12 bg-success text-white">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl text-center">Congratulations! 🎉</h3>
        <p className="py-4">
          You've completed this grid and made significant progress toward
          achieving your dream life.
        </p>
        <h3 className="font-bold text-lg text-center">What's Next?</h3>
        <p className="pb-4">
          You can save this grid as completed and store it in your history. Or,
          if this is a recurring goal, you may choose to save it as a template
          and re-activate it later!
        </p>
        <div className="flex gap-2 justify-end">
          <button className="btn btn-error">Delete</button>
          <button className="btn btn-accent">Save as Template</button>
          <button className="btn btn-primary">Save as Completed</button>
        </div>
      </div>
    </dialog>
  )
}
