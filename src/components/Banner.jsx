export default function Banner() {
  return (
    <div className="hero bg-base-200 rounded">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://cdn.britannica.com/53/280453-004-B1BC6AEC/Shohei-Ohtani-LA-Dodgers-portrait-2024.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-4xl font-bold">Be Like Shohei</h1>
          <p className="py-6">
            Have a dream goal in mind but unsure how to achieve it? Let the
            Harada Assistant help you break it up into customized tasks and
            automatically fill in a new grid for you – and it's completely free!
          </p>
          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
    </div>
  )
}
