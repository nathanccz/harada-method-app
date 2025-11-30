export default function VideoBackground() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* The video element positioned as the background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* A semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Placeholder for your main content, positioned above the video */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-4 text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl">Your Content Here</h1>
        <p className="mt-4 text-xl md:text-2xl">
          This text is placed over the video background.
        </p>
      </div>
    </div>
  )
}
