export default function DemoVideo() {
  return (
    <div className="inset-0">
      <video
        className="w-full h-full object-cover"
        src="https://res.cloudinary.com/dw2e6ddjn/video/upload/vc_auto,ac_none/myharada-demo-video-compressed-cut-merged-1768338896650_g42jkb.mp4"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
      />
    </div>
  )
}
