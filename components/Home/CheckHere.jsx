import React, { useState } from 'react'

const CheckHere = ({ openAIKey }) => {

    const emptyInputs = { question: "", answer: "", marks: "" }
    const [problemInputs, setProblemInputs] = useState(emptyInputs)

    const handleChange = (e) => {
        setProblemInputs({ ...problemInputs, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(problemInputs)
    }
    return (
        <div>
            {openAIKey ?
                <div>
                    <form onSubmit={handleSubmit} className='flex flex-col space-y-10' method="post">
                        <textarea onChange={handleChange} value={problemInputs.question} rows={1} className='opacity-80 bg-transparent w-full md:w-2/3 outline-dashed outline-1 p-3' type="text" name="question" id="question" placeholder='Enter your question here' required />
                        <div>
                            <label htmlFor="marks">marks:</label>
                            <input onChange={handleChange} value={problemInputs.marks} className='px-2 mx-3 bg-transparent opacity-80 w-1/6 outline-dashed outline-1 p-3' type="number" name="marks" id="marks" placeholder='Enter number of marks' required />
                        </div>
                        <textarea onChange={handleChange} value={problemInputs.answer} rows={1} className='opacity-80 bg-transparent w-full md:w-2/3 outline-dashed outline-1 p-3' type="text" name="answer" id="answer" placeholder='Enter your answer here' required />

                        <button className='py-3 bg-gray-800 text-white text-center px-4 w-fit hover:text-gray-200' type="submit">checkup</button>
                    </form>
                </div>
                :
                <div>
                    <p>Please set the apiKey first to use this tool.</p>
                </div>
            }

            <div className="my-8 xl:my-11 lg:my-11 w-2/3 h-[2px] bg-gradient-to-l from-[#f2f2f2] to-[#dbdbde]"></div>

        </div>
    )
}

export default CheckHere
