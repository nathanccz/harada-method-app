export default function Templates() {
  return (
    <section className="flex flex-col gap-5 mt-5 basis-4/5">
      <h1 className="text-2xl font-bold">Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="card bg-slate-100 w-84 shadow-sm border border-transparent hover:bg-slate-200 hover:border-accent ease-in-out duration-100">
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
      </div>
    </section>
  )
}
