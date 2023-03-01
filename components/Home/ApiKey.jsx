import React, { useState } from 'react'

const ApiKey = () => {

    const [theApiKey, setTheApiKey] = useState("")

    const handleApiKey = (e) => {
        e.preventDefault();
        console.log(theApiKey)
    }

    const handleChange = (e) => {
        setTheApiKey(e.target.value)
    }
    return (
        <div>

            <div className='py-8'>
                <form onSubmit={handleApiKey} method='post'>
                    <input onChange={handleChange} value={theApiKey} className='opacity-80 w-2/3 sm:w-1/3 outline-none p-3' type="text" name="apiKey" id="apiKey" placeholder='Enter your OpenAI apiKey' required />
                    <button className='py-3 bg-gray-800 text-white text-center rounded-r-xl px-4 transition-all hover:text-gray-200' type="submit">setKey</button>
                </form>
            </div>

            <div className='space-y-3'>
                <h3 className='text-xl font-semibold'>Follow below steps to create your OpenAI apiKey</h3>
                <p>to create your own apiKey create an OpenAI account.</p>
            </div>

            <div className="my-8 xl:my-11 lg:my-11 w-2/3 h-[2px] bg-gradient-to-l from-[#f2f2f2] to-[#dbdbde]"></div>
        </div>
    )
}

export default ApiKey
