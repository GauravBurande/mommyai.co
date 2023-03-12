import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"
import Head from "next/head"

const Home = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">

      <Head>
        <title>mommyAI | stories for kids</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container px-10 md:px-16'>
        <Header />
        <Hero />
        <Story />
        <Generate />
        <Testimonials />
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
          <h2 className='text-5xl pb-10 font-bold max-w-6xl tracking-wide text-gray-200'>Fun and <span className="text-transparent bg-clip-text bg-gradient-to-tr from-teal-400 to-yellow-200">creative</span> way to engage your <span className="text-transparent bg-clip-text bg-gradient-to-tr from-fuchsia-500 to-cyan-500">children!</span></h2>
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

  const exampleStory = ["Once upon a time, in a kingdom far away, there lived a brave and adventurous princess named Petunia. She was known for her kind heart, her beauty, and her exceptional sword skills. One day, an evil witch came to the kingdom and cast a spell on the land, causing chaos and destruction wherever she went.",
    "Princess Petunia knew she had to act quickly to save her kingdom. She grabbed her trusty sword and set out on a mission to defeat the witch and break the spell. She journeyed through treacherous forests, over dangerous mountains, and across raging rivers until she finally reached the witch's lair.",
    "As she approached the lair, she was confronted by a fierce and terrifying beast. The beast had been bewitched by the witch and was under her control. Princess Petunia knew she had to defeat the beast in order to get to the witch, so she bravely charged forward with her sword raised high.",
    "The beast lunged at her with its sharp claws, but Princess Petunia was quick and agile. She dodged the beast's attacks and struck back with her sword. The battle was long and grueling, but in the end, Princess Petunia emerged victorious. She had slain the beast and broken the witch's spell.",
    "With the spell broken, the kingdom was restored to its former glory. The people rejoiced and threw a grand celebration in honor of Princess Petunia's bravery and heroism. And from that day forward, Princess Petunia was known as the Princess who slayed the witch with her sword.",
    "The End."]
  return (
    <div id="story">
      <div className='flex flex-col items-center justify-center space-x-10 lg:flex-row'>
        <div className="w-5/6 pb-8 md:pb-0">
          <img src="images/princess.png" alt="princess" />
        </div>

        <div>
          <h2 className="text-2xl py-3 md:px-8 font-semibold text-blue-500">Princess Petunia and the Battle Against the Bewitched Beast</h2>

          <div className="bg-gradient-to-b mr-3 from-black to-transparent translate-y-7 h-8"></div>
          <div className="max-h-[250px] md:px-8 overflow-y-scroll">
            {exampleStory.map((para, i) => {
              return (
                <p className="py-4" key={i}>{para}</p>
              )
            })}
          </div>
          <div className="w-11/12 bg-gradient-to-t from-black to-transparent -translate-y-8 h-8"></div>
        </div>
      </div>

      <div className="my-8 xl:my-11 lg:my-11 w-5/6 h-[2px] bg-gradient-to-l from-[#000000] to-[#dbdbde]"></div>
    </div>
  )
}

function Generate() {

  const [userPrompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [story, setStory] = useState()
  const [title, setTitle] = useState()

  const handleChange = (e) => {
    setPrompt(e.target.value)
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");



      const raw = JSON.stringify({
        userPrompt: userPrompt,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch("/api/openai", requestOptions);
      const result = await response.json();

      if (result.success) {
        const textArray = result.text.split("\n\n")
        const title = textArray[0]

        let storyParas = textArray
        storyParas.splice(0, 1)

        setTitle(title)
        setStory(storyParas);
      } else {
        setTitle(result.message)
      }

      if (result) { setLoading(false) }
    } catch (error) {
      console.log("error: ", error);
      return error;
    }
  }

  return (
    <div id='generate'>
      <div className="flex flex-col space-y-8">
        <div>
          <form method="post" onSubmit={handleSubmit}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative mx-auto lg:w-2/3">
              <input onChange={handleChange} value={userPrompt} type="text" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter the story details you want to generate..." required />
              <button disabled={loading} type="submit" className={`text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${loading && "animate-pulse"}`}>{loading ? "Generating" : "Generate"}</button>
              <button disabled={loading} className="absolute right-24 bottom-2  hover:text-blue-500 font-medium mr-4 p-2">id</button>
            </div>
          </form>
        </div>

        <div className="w-10/12 mx-auto">
          {loading ?
            <div className="space-y-3 animate-pulse">
              <h1 className="h-10 w-2/3 mb-10 bg-gray-800 rounded-xl"></h1>
              <p className="h-3 w-3/6 bg-gray-800 rounded-xl"></p>
              <p className="h-3 w-2/3 bg-gray-800 rounded-xl"></p>
              <p className="h-3 w-3/5 bg-gray-800 rounded-xl"></p>
              <p className="h-3 bg-gray-800 rounded-xl"></p>
              <div className="mb-11 h-3"></div>
              <p className="h-3 w-4/12 bg-gray-800 rounded-xl"></p>
              <p className="h-3 w-8/12 bg-gray-800 rounded-xl"></p>
              <p className="h-3 w-3/4 bg-gray-800 rounded-xl"></p>
              <p className="h-3 w-5/6 bg-gray-800 rounded-xl"></p>
              <p className="h-3 w-1/6 bg-gray-800 rounded-xl"></p>
              <p className="h-3 w-4/12 bg-gray-800 rounded-xl"></p>
            </div>
            :
            <div className=" w-10/12 md:w-8/12 mx-auto">
              {<div>
                <h3 className="py-8 text-3xl font-semibold">{title}</h3>
                {story && story.map((para, index) => {
                  return (
                    <p className="py-2" key={index}>{para}</p>
                  )
                })}
              </div>}
            </div>
          }
        </div>
      </div>

      <div className="my-8 xl:my-11 lg:my-11 w-5/6 h-[2.5px] bg-gradient-to-l from-[#000000] to-[#dbdbde]"></div>
    </div>
  )
}

// function FAQ() {

//   const accordionHeader = document.querySelectorAll(".accordion-header");
//   accordionHeader.forEach((header) => {
//     header.addEventListener("click", function () {
//       const accordionContent = header.parentElement.querySelector(".accordion-content");
//       let accordionMaxHeight = accordionContent.style.maxHeight;

//       if (accordionMaxHeight == "0px" || accordionMaxHeight.length == 0) {
//         accordionContent.style.maxHeight = `${accordionContent.scrollHeight + 32}px`;
//         header.querySelector(".fas").classList.remove("fa-plus");
//         header.querySelector(".fas").classList.add("fa-minus");
//       } else {
//         accordionContent.style.maxHeight = `0px`;
//         header.querySelector(".fas").classList.add("fa-plus");
//         header.querySelector(".fas").classList.remove("fa-minus");
//       }
//     });
//   });

//   const faqs = [
//     {
//       "title": "how to get coins to play with this tool?",
//       "description": "first you need to buy coins, then you'll get a key to your email address, click on fill key and paste the key there."
//     },
//     {
//       "title": "how to get coins to play with this tool?",
//       "description": "first you need to buy coins, then you'll get a key to your email address, click on fill key and paste the key there."
//     },
//     {
//       "title": "how to get coins to play with this tool?",
//       "description": "first you need to buy coins, then you'll get a key to your email address, click on fill key and paste the key there."
//     }
//   ]


//   return (
//     <>
//       <style>
//         {
//           `.accordion-content {
//             transition: max-height 0.3s ease-out, padding 0.3s ease;
//           }`
//         }
//       </style>
//       <div>
//         <div className="grid py-10 place-items-center">
//           <div className="max-w-full mx-2 sm:mx-8">
//             <div className="p-5 sm:p-10 shadow-sm rounded-xl">
//               <div className="">
//                 <h1 className="font-extrabold text-gray-200 text-2xl ml-5">FAQ's</h1>
//                 <div className="h-1 bg-blue-500 rounded-full w-1/6">
//                 </div>
//               </div>
//               <div className="mt-14 ml-4 sm:ml-24">
//                 {faqs.map((faq, index) => {
//                   return (
//                     <div key={index} className="transition">
//                       <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
//                         <i className="fas fa-plus text-purple-700"></i>
//                         <h2 className="text-gray-700 font-semibold">{faq.title}</h2>
//                       </div>
//                       <div className="accordion-content px-5 pt-0 overflow-hidden max-h-0 space-y-4 mr-4 text-sm">
//                         <div className="flex flex-row ml-8 py-4">
//                           <div className="flex w-1 bg-gradient-to-t from-red-500 to-red-400"></div>
//                           <div className="flex-1 p-3">
//                             <p className="pl-2 sm:pl-4 text-justify">
//                               {faq.description}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 })}

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="my-8 xl:my-11 lg:my-11 w-5/6 h-[2px] bg-gradient-to-l from-[#000000] to-[#dbdbde]"></div>
//     </>
//   )
// }

export default Home
