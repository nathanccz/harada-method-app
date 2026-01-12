import ReactPlayer from 'react-player'

export default function DemoVideo() {
  return (
    <div className="aspect-video my-5">
      <ReactPlayer
        className="inset-0"
        src="https://www.youtube.com/watch?v=2y2Z06hVmWE"
        width="100%"
        height="100%"
        playing={true}
        muted={true}
        playsInLine={true}
        controls={false}
        loop={true}
      />
    </div>
  )
}
