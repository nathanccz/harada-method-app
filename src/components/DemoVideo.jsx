import ReactPlayer from 'react-player'

export default function DemoVideo() {
  return (
    <div className="aspect-video my-5">
      <ReactPlayer
        className="inset-0"
        src="https://res.cloudinary.com/dw2e6ddjn/video/upload/v1768185922/myharada-demo-video-compressed_rtqlej.mp4"
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
