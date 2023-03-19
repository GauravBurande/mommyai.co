import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import Head from "next/head"
import Link from 'next/link'
import { RiLightbulbFlashFill } from "react-icons/ri"
import { BsSend, BsSoundwave } from "react-icons/bs"
import { Toaster, toast } from 'sonner'
import { useRouter } from "next/router"

const Home = () => {

  const [display, setDisplay] = useState(false)
  const [localKey, setLocalKey] = useState()
  const [coins, setCoins] = useState(0)
  console.log(coins - 1)

  const router = useRouter()

  useEffect(() => {
    const key = typeof window !== "undefined" && window.localStorage.getItem("key")
    const coins = typeof window !== "undefined" && window.localStorage.getItem("coins")
    const instance_id = typeof window !== "undefined" && window.localStorage.getItem("instance_id")

    if (key) {
      setLocalKey(key)
      setCoins(parseInt(coins))

      const validateKey = async () => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Accept", "application/json");
          myHeaders.append("Accept", "application/x-www-form-urlencoded");

          const raw = new URLSearchParams({
            'license_key': key,
          })

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          const response = await fetch(`https://api.lemonsqueezy.com/v1/licenses/validate`, requestOptions);
          const result = await response.json();

          if (!result.valid) {
            toast.error("Your subscription has ended!")
            localStorage.clear()

            const deactivateKey = async () => {
              try {
                const myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Accept", "application/x-www-form-urlencoded");

                const raw = new URLSearchParams({
                  'license_key': key,
                  'instance_id': instance_id
                })

                const requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow",
                };

                const response = await fetch(`https://api.lemonsqueezy.com/v1/licenses/deactivate`, requestOptions);
                const result = await response.json();

                if (result.deactivated) {
                  toast.error("The license key has been deactivated!")
                  setTimeout(() => {
                    router.reload(window.location.pathname)
                  }, 2000);
                }
              } catch (error) {
                toast.error(error)
                return error;
              }
            }

            deactivateKey();
          }
        } catch (error) {
          toast.error(error)
          return error;
        }
      }

      validateKey()
    }
  })

  const toggleDisplay = () => {
    setDisplay(!display)
  }

  return (
    <>
      <Head>
        <title>mommyAI | stories for kids</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <Toaster richColors closeButton position="bottom-center" />
        {display && <Key toggleDisplay={toggleDisplay} />}

        <div className='container px-10 md:px-16'>
          <Header coins={coins} toggleDisplay={toggleDisplay} localKey={localKey} />
          <Hero />
          <Story />
          <Generate coins={coins} setCoins={setCoins} localKey={localKey} />
          <Testimonials />
          <Footer />
        </div>
      </div>
    </>
  )
}

function Header({ toggleDisplay, localKey, coins }) {

  const deleteKey = () => {
    localStorage.clear()
    toast.success("The key has been deleted successfully!")
  }

  return (
    <div>
      <div className='flex items-center pt-8 sm:pt-14 xl:pt-16 pb-14 justify-between'>
        <div className='w-[200px] mr-5'>
          <Link href={'/'}>
            <h2 className='text-3xl md:text-4xl font-semibold'>mommy<span className='text-gray-500'>AI</span>.co</h2>
          </Link>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-center space-x-3 space-y-3 md:space-y-0'>
          {coins == 0 && localKey && <button onClick={deleteKey} className='bg-gray-200 text-sm text-black flex items-center justify-center hover:text-white hover:bg-gradient-to-tr from-fuchsia-500 to-cyan-500 space-x-2 shadow-2xl transition-all px-2 md:px-4 py-1 md:py-2 md:text-[1rem] rounded-md'>
            <p>delete key</p>
          </button>}
          {!localKey && <div>
            <button onClick={toggleDisplay} className='bg-gray-200 text-sm text-black flex items-center justify-center hover:text-white hover:bg-gradient-to-tr from-fuchsia-500 to-cyan-500 space-x-2 shadow-2xl transition-all px-2 md:px-4 py-1 md:py-2 md:text-[1rem] rounded-md'>
              <p>paste key</p>
            </button>
          </div>}
          <div className="relative">
            <button className='bg-gray-500 text-sm hover:text-gray-900 flex items-center justify-center text-white hover:bg-gradient-to-tr from-teal-400 to-yellow-200 space-x-2 shadow-2xl transition-all px-2 md:px-4 py-1 md:py-2 md:text-[1rem] rounded-md'>
              <a target={"_blank"} href="https://mommyai.lemonsqueezy.com/checkout/buy/3abd94d1-12be-473a-ad17-86e441bbe123">pricing</a>
            </button>
            <p className="absolute whitespace-nowrap -translate-x-2 md:translate-x-0">{coins} coins left!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Key({ toggleDisplay }) {

  const [key, setKey] = useState("")

  const handleChange = (e) => {
    setKey(e.target.value)
  }

  const router = useRouter()

  const coinVariants = {
    "Letter": 200,
    "Word": 500,
    "Sentence": 1000
  }

  const handleActivate = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Accept", "application/x-www-form-urlencoded");

      const date = new Date().toUTCString()
      const raw = new URLSearchParams({
        'license_key': key,
        'instance_name': date
      })

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/activate", requestOptions);
      const result = await response.json();
      if (result.activated) {
        toast.success("Your license key was successfully activated!")
        localStorage.setItem("key", key)
        localStorage.setItem("instance_id", result.instance.id)
        const variant = result.meta.variant_name
        localStorage.setItem("coins", JSON.stringify(coinVariants[variant]))
        setTimeout(() => {
          router.reload(window.location.pathname)
        }, 2000);
      }
    } catch (error) {
      toast.error(error)
      return error;
    }
  }

  return (
    <>
      <div className="fixed z-10 min-h-screen min-w-full text-gray-700 flex flex-col space-y-8 items-center justify-center bg-gray-200">
        <h3 className="text-2xl">Activate License </h3>
        <p className="max-w-3xl">To activate your license key, simply enter the license key we have sent to your email. If you haven't yet purchased any coins, you can purchase them <a className="text-blue-500 hover:text-purple-500 cursor-pointer underline hover:underline-offset-4 transition-all duration-500" href="https://mommyai.lemonsqueezy.com/checkout/buy/3abd94d1-12be-473a-ad17-86e441bbe123">here.</a></p>
        <div className="relative w-2/3">
          <input autoComplete="off" onChange={handleChange} value={key} type="text" id="key" className="w-full text-center block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="K534N-KL45-N45B45J-45JB54K3" required />

          <button onClick={handleActivate} type="submit" className={`text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Activate</button>
        </div>
        <button onClick={toggleDisplay} className="px-4 py-2 bg-blue-200 rounded-full hover:bg-blue-300">Close</button>
      </div>
    </>
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

  const speak = () => {
    const msg = new SpeechSynthesisUtterance()
    const voices = window.speechSynthesis.getVoices()
    msg.voice = voices[4]
    msg.volume = 1
    msg.rate = 1
    msg.pitch = 1
    msg.text = exampleStory.join(' ')
    msg.lang = 'en-US'
    speechSynthesis.speak(msg)
  }

  return (
    <div id="story">
      <div className='flex flex-col items-center justify-center space-x-10 lg:flex-row'>
        <div className="w-5/6 pb-8 md:pb-0">
          <img src="images/princess.png" alt="princess" />
        </div>

        <div>
          <h2 className="text-2xl py-3 md:px-8 font-semibold text-yellow-300">Princess Petunia and the Battle Against the Bewitched Beast</h2>
          <button onClick={speak} className="md:px-8 text-purple-300 hover:text-green-300 flex items-center gap-2 pt-2"><BsSoundwave /> read the story loud</button>
          <div className="bg-gradient-to-b from-black to-transparent mr-3 translate-y-11 h-12"></div>
          <div className="max-h-[250px] md:px-8 overflow-y-scroll">
            {exampleStory.map((para, i) => {
              return (
                <p className="py-4 my-1" key={i}>{para}</p>
              )
            })}
          </div>
          <div className="bg-gradient-to-t from-black to-transparent mr-3 -translate-y-11 h-12"></div>
        </div>
      </div>

      <div className="my-8 xl:my-11 lg:my-11 w-5/6 h-[2px] bg-gradient-to-l from-[#000000] to-[#dbdbde]"></div>
    </div>
  )
}

function Generate({ localKey, setCoins, coins }) {

  const [userPrompt, setUserPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [story, setStory] = useState()
  const [title, setTitle] = useState()

  const handleChange = (e) => {
    setUserPrompt(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (localKey) {
      setLoading(true)
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
          const newCoins = coins - 1
          setCoins(newCoins)
          localStorage.coins = newCoins
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
    } else {
      toast.error("Please buy some coins first!")
    }
  }

  const suggestions = [
    "the girl who climbed the mount everest!",
    "the pirates who found the treasure and the King of an Island.",
    "Fluffy the rabbit and the Tom cat",
    "Lisa, stuck in jungle with a fairy!",
    "Eddie the Inventor, who invented universal travel and Peter",
    "Tommy, the dog in the magical forest with a elephant",
    "The cursed princess who defeated the witch",
    "A panda who became a magician",
    "A princess who travelled across the whole africa and found diamonds",
    "Dragon Prince and the wizard",
    "The magical mirror, the door to the other world",
    "The little hamster who became mayor of the town.",
    "The magic house where time moves differently",
    "adventures of the queen in the ice world",
    "The magical book and amora",
    "The little girl who defeated wizard cat",
    "The cow who travelled in the space"
  ]

  const suggest = () => {
    const randomSuggest = Math.floor(suggestions.length * (Math.random()))

    setUserPrompt(suggestions[randomSuggest])
  }

  const speak = () => {
    const msg = new SpeechSynthesisUtterance()
    const voices = window.speechSynthesis.getVoices()
    msg.voice = voices[4]
    msg.volume = 1
    msg.rate = 1
    msg.pitch = 1
    msg.text = story.join(' ')
    msg.lang = 'en-US'
    speechSynthesis.speak(msg)
  }

  return (
    <div id='generate'>
      <div className="flex flex-col space-y-8">
        <div>
          <div>
            <h3 className="text-xl text-center">Enter anything that comes in your mind: genre, plot, incident, character, </h3>
            <span className="flex items-center justify-center pb-8">
              <p>or try some suggestions:</p>
              <button onClick={suggest} disabled={loading} className="text-3xl text-blue-200 hover:text-purple-300 font-medium p-2">
                <RiLightbulbFlashFill />
              </button>
            </span>

          </div>

          <form method="post" onSubmit={handleSubmit}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative mx-auto lg:w-2/3">
              <input autoComplete="off" maxLength={100} onChange={handleChange} value={userPrompt} type="text" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="a kid who became storyteller..." required />
              <button disabled={loading || coins == 0} type="submit" className={`text-white disabled:bg-purple-500 absolute right-2.5 bottom-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${loading && "animate-pulse"}`}>{loading ? "Generating" : <BsSend />}</button>
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
              {story && <button onClick={speak} className="text-purple-300 hover:text-green-300 flex items-center gap-2 pb-4 pt-2"><BsSoundwave /> read the story loud</button>}
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

function Testimonials() {

  const testimonials = [
    {
      "author": "Gracy Dhok",
      "quote": "I am amazed by the stories this generates, I wasn't expecting anything like that."
    },
    {
      "author": "Mary Smith",
      "quote": "I had a good experience using this. My kid was so addicted to youtube and all. This keeps keeps him reading and thinking and away from social media."
    },
    {
      "author": "Jacob wilson",
      "quote": "I didn't know what should I enter to create the story first, the suggestion feature was really helpful for that."
    },
    {
      "author": "Isla Walsh",
      "quote": "I was hesitant to use this, as it could create inappropriate content, we cannot trust kids with it, but this does a good job at it. It refused to generate that story and instead told me another good story."
    },
    {
      "author": "William O'Neill",
      "quote": "It took about 10 secods to create the story, I don't know it's fast or slow, but i liked that it generated a long enough story, I think the time taken is fine for this."
    },
    {
      "author": "Amelia Jones",
      "quote": "Jimmy was so fascinated by this! He was so engaged with it! I would recommend this to my friends."
    },
    {
      "author": "Jack Brown",
      "quote": "Does a good job at not generating any explicit or inappropriate content."
    },
  ]

  return (
    <>
      <div>
        <h3 className="text-3xl font-semibold py-8">What other parents are saying</h3>
        <div className="flex flex-nowrap space-x-4 md:mx-24 overflow-x-scroll">
          {testimonials.map((testimonial, i) => {
            return (
              <div key={i} className="flex min-w-[20rem] bg-green-100 rounded-lg text-black px-7 py-4 flex-col justify-between">
                <p>"{testimonial.quote}"</p>
                <h6 className="text-lg font-semibold">{testimonial.author}</h6>
              </div>
            )
          })}
        </div>

        <p className="py-8 font-semibold text-lg">Send me an <a className="text-blue-500 hover:text-purple-500 cursor-pointer underline hover:underline-offset-4 transition-all duration-500" href="mailto:swagstoar@gmail.com">email</a> for queries and feedback.</p>

        <div className="my-8 xl:my-11 lg:my-11 w-5/6 h-[2px] bg-gradient-to-l from-[#000000] to-[#dbdbde]"></div>
      </div>
    </>
  )
}

export default Home
