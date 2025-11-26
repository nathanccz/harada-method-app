export default function Templates() {
  return (
    <main className="flex flex-col gap-5 mt-5 p-10">
      <h1 className="text-2xl font-bold">Templates</h1>
      <div className="card bg-base-100 w-84 shadow-sm border border-transparent hover:bg-base-200 hover:border-accent ease-in-out duration-100">
        <figure className="px-10 pt-10">
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Card Title</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </main>
  )
}
