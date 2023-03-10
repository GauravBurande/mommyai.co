import TheHead from "../components/TheHead"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">

      <TheHead />

      <div className='container px-10 md:px-16'>
        <Header />
        <Hero />
        <Story />
        <Generate />
        <Footer />
      </div>
    </div>
  )
}

function Hero() {
  return (
    <div>
      <div className='flex flex-col md:flex-row md:justify-center'>
        <div className='flex flex-col order-1 md:order-none justify-center'>
          <h2 className='text-5xl pb-10 font-bold max-w-6xl tracking-wide text-gray-200'>Fun and creative way to engage your children!</h2>
          <div className='max-w-3xl space-y-3'>
            <p>Create stories on various topics that your children are sure to enjoy.
            </p>
            <div className='flex flex-col space-y-2'>
              <div className='text-blue-500 hover:text-purple-500 cursor-pointer text-xl underline hover:underline-offset-4 transition-all duration-500 block w-fit'><a href="#generate">Try it out today!</a></div>
              <div className='text-blue-500 hover:text-purple-500 cursor-pointer text-xl underline hover:underline-offset-4 transition-all duration-500 block w-fit'><a href="#story">Read an example story!</a></div>
            </div>
          </div>
        </div>
        <div className='w-3/6'>
          <img className='rounded-3xl pb-8 md:pb-0' src="images/mommy.png" alt="mommy" />
        </div>
      </div>

      <div className="my-8 xl:my-11 lg:my-11 w-5/6 h-[2px] bg-gradient-to-l from-[#000000] to-[#dbdbde]"></div>
    </div>
  )
}

function Story() {
  return (
    <div id="story">
      <div className='flex flex-col items-center justify-center space-x-10 lg:flex-row'>
        <div className="w-5/6 pb-8 md:pb-0">
          <img src="images/princess.png" alt="princess" />
        </div>

        <div>
          <h2 className="text-2xl py-3 px-8 font-semibold">Princess Petunia and the Battle Against the Bewitched Beast</h2>

          <div className="space-y-2 max-h-[250px] px-8 overflow-y-scroll">
            <p>Once upon a time, in a kingdom far away, there lived a brave and adventurous princess named Petunia. She was known for her kind heart, her beauty, and her exceptional sword skills. One day, an evil witch came to the kingdom and cast a spell on the land, causing chaos and destruction wherever she went.</p>
            <p>Princess Petunia knew she had to act quickly to save her kingdom. She grabbed her trusty sword and set out on a mission to defeat the witch and break the spell. She journeyed through treacherous forests, over dangerous mountains, and across raging rivers until she finally reached the witch's lair.</p>
            <p>As she approached the lair, she was confronted by a fierce and terrifying beast. The beast had been bewitched by the witch and was under her control. Princess Petunia knew she had to defeat the beast in order to get to the witch, so she bravely charged forward with her sword raised high.</p>
            <p>The beast lunged at her with its sharp claws, but Princess Petunia was quick and agile. She dodged the beast's attacks and struck back with her sword. The battle was long and grueling, but in the end, Princess Petunia emerged victorious. She had slain the beast and broken the witch's spell.</p>
            <p>With the spell broken, the kingdom was restored to its former glory. The people rejoiced and threw a grand celebration in honor of Princess Petunia's bravery and heroism. And from that day forward, Princess Petunia was known as the Princess who slayed the witch with her sword.</p>
            <p>The End.</p>
          </div>
        </div>
      </div>

      <div className="my-8 xl:my-11 lg:my-11 w-5/6 h-[2px] bg-gradient-to-l from-[#000000] to-[#dbdbde]"></div>
    </div>
  )
}

function Generate() {
  return (
    <div id='generate'>
      <div>
        <div>
          <form>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative mx-auto lg:w-2/3">
              <input type="text" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter the story details you want to generate..." required />
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate</button>
            </div>
          </form>
        </div>
      </div>

      <div className="my-8 xl:my-11 lg:my-11 w-5/6 h-[2px] bg-gradient-to-l from-[#000000] to-[#dbdbde]"></div>
    </div>
  )
}

export default Home
