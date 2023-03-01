import React from 'react'

const Hero = () => {
    return (
        <div>
            <div>
                <div className='min-h-[300px] flex flex-col justify-center'>
                    <h2 className='text-6xl pb-10 font-bold max-w-6xl text-gray-800'>If an AI can find solutions to your problems, it can evaluate them too.</h2>
                    <div className='max-w-3xl space-y-3'>
                        <p>No need for a human for doing this simple task.</p>
                        <p>If you're a student, this platform allows you to submit your answer and receive immediate feedback on your performance.</p>
                        <p>If you're a teacher, this is going to help you a lot evaluating question papers.</p>
                    </div>
                </div>
            </div>

            <div className="my-8 xl:my-11 lg:my-11 w-5/6 h-[2px] bg-gradient-to-l from-[#f2f2f2] to-[#dbdbde]"></div>

        </div>
    )
}

export default Hero
