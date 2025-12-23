export default function MainSkeleton() {
  return (
    <main className="p-4 w-full">
      <div className="skeleton h-16 w-48 mb-4"></div>
      <div className="flex gap-3 w-full justify-between mb-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
      <div className="skeleton h-128 w-full"></div>
    </main>
  )
}
