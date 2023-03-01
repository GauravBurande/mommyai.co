import type { NextPage } from 'next'
import TheHead from "../components/TheHead"
import Header from "../components/Header"
import Hero from "../components/Home/Hero"

const Home: NextPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <img src="/images/beams.jpg" alt="" className="absolute -z-10 top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
      <div className="absolute inset-0 bg-[url(/images/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,255))]"></div>

      <TheHead />

      <div className='container px-16'>
        <Header />
        <Hero />
      </div>

    </div>
  )
}

export default Home
