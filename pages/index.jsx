import TheHead from "../components/TheHead"
import Header from "../components/Header"
import Hero from "../components/Home/Hero"
import ApiKey from "../components/Home/ApiKey"
import CheckHere from "../components/Home/CheckHere"
import Footer from "../components/Footer"
import { useEffect, useState } from 'react'

const Home = () => {

  const [openAIKey, setOpenAIKey] = useState()

  useEffect(() => {
    const key = typeof window !== "undefined" && window.localStorage.getItem('apiKey')

    if (key) {
      setOpenAIKey(key)
    }
  })
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <img src="/images/beams.jpg" alt="" className="absolute -z-10 top-[30rem] left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
      <div className="absolute -z-10 inset-0 bg-[url(/images/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,255))]"></div>

      <TheHead />

      <div className='container space-y-28 px-10 md:px-16'>
        <Header />
        <Hero />
        <ApiKey openAIKey={openAIKey} setOpenAIKey={setOpenAIKey} />
        <CheckHere openAIKey={openAIKey} />
        <Footer />
      </div>

    </div>
  )
}

export default Home
