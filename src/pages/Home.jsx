import Navbar from '../components/Navbar'
import VideoBackground from '../components/VideoBackground'
import Footer from '../components/Footer'

import Accordion from '../components/Accordion'
import DemoVideo from '../components/DemoVideo'
import PublicNavbar from '../components/PublicNavbar'

export default function Home() {
  return (
    <main>
      <PublicNavbar />
      <VideoBackground />
      <section className="text-center text-white p-8 md:p-12 lg:p-16 bg-slate-800">
        <h2 className="text-3xl mb-8">Create your own Harada grid</h2>
        <div className="flex gap-10 justify-center flex-col lg:flex-row max-w-[1400px] mx-auto">
          <div className="basis-2/3">
            <DemoVideo />
          </div>
          <div className="p-0 lg:p-8 w-full lg:w-120 mx-auto">
            <Accordion />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
