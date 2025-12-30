export default function MyGridsSkeleton() {
  return (
    <section className="flex flex-col gap-5 mt-5 basis-4/5 relative lg:h-[85vh] lg:overflow-scroll">
      <div className="skeleton h-20 w-60"></div>
      <div className="grid grids-col-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            className="skeleton w-full h-60 md:w-100 md:h-100 lg:h-70 lg:w-70"
            key={`skeleton-${i + 1}`}
          ></div>
        ))}
      </div>
      <div className="grid grids-col-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            className="skeleton lg:h-70 lg:w-70"
            key={`skeleton-${i + 1}`}
          ></div>
        ))}
      </div>
    </section>
  )
}
