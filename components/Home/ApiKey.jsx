import React, { useState } from 'react'
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: localStorage.getItem('apiKey'),
});

const gpt3 = new OpenAIApi(config);

const ApiKey = ({ openAIKey, setOpenAIKey }) => {

    const [theApiKey, setTheApiKey] = useState("")


    const handleApiKey = (e) => {
        e.preventDefault();
        setOpenAIKey(theApiKey)
        localStorage.setItem("apiKey", JSON.stringify(theApiKey))

        starterFetchRequest()
    }

    const starterFetchRequest = async () => {
        try {
            const prompt = process.env.NEXT_PUBLIC_STARTER_PROMPT
            if (!prompt) {
                alert("Sorry, there is some error configuring your apiKey. Please try again.")
            }

        } catch (error) {
            console.log("error: ", error)
        }
    }

    const deleteApiKey = () => {
        localStorage.removeItem("apiKey")
        setTheApiKey("")
        setOpenAIKey()
    }

    const handleChange = (e) => {
        setTheApiKey(e.target.value)
    }
    return (
        <div>
            {openAIKey ?
                <div className='py-8'>
                    <p className='px-8'>Your apiKey is set.</p>
                    <input value={"*********************"} className='opacity-80 w-2/3 sm:w-1/3 outline-none p-3' type="text" name="apiKey" id="apiKey" readOnly />
                    <button onClick={deleteApiKey} className='py-3 bg-gray-800 text-white text-center rounded-r-xl px-4 transition-all hover:text-gray-200' type="submit">deleteKey</button>
                </div>
                : <div>
                    <div className='py-8'>
                        <form onSubmit={handleApiKey} method='post'>
                            <input onChange={handleChange} value={theApiKey} className='opacity-80 w-2/3 sm:w-1/3 outline-none p-3' type="text" name="apiKey" id="apiKey" placeholder='Enter your OpenAI apiKey' required />
                            <button className='py-3 bg-gray-800 text-white text-center rounded-r-xl px-4 transition-all hover:text-gray-200' type="submit">setKey</button>
                        </form>
                    </div>

                    <div className='space-y-3'>
                        <h3 className='text-xl font-semibold'>Follow below steps to get your OpenAI apiKey</h3>
                        <p>to get your own apiKey create an OpenAI account.</p>
                        <p>and visit this URL: <span className='text-blue-500 hover:underline underline-offset-4 decoration-black'><a href="https://platform.openai.com/account/api-keys">https://platform.openai.com/account/api-keys</a></span></p>
                    </div>
                </div>}

            <div className="my-8 xl:my-11 lg:my-11 w-2/3 h-[2px] bg-gradient-to-l from-[#f2f2f2] to-[#dbdbde]"></div>
        </div>
    )
}

export default ApiKey
