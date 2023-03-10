import Link from 'next/link'
import React from 'react'
import { GiBrokenPottery } from "react-icons/gi"
import { BsCoin } from "react-icons/bs"

const Header = () => {
    let coins = 0

    return (
        <div>
            <div className='flex items-center pt-8 sm:pt-14 xl:pt-16 pb-14 justify-between'>
                <div className='w-[200px] mr-5'>
                    <Link href={'/'}>
                        <h2 className='text-3xl md:text-4xl font-semibold'>mommy<span className='text-gray-500'>AI</span>.co</h2>
                    </Link>
                </div>

                <div className='flex flex-col md:flex-row items-center justify-center space-x-3 space-y-3 md:space-y-0'>
                    <div>
                        <button className='bg-gray-500 text-sm hover:text-gray-900 flex items-center justify-center text-white hover:bg-gradient-to-tr from-teal-400 to-yellow-200 space-x-2 shadow-2xl transition-all px-2 py-1 md:text-lg rounded-md'>
                            <p>buy</p>
                            <BsCoin />
                        </button>
                    </div>
                    <div className='relative'>
                        <button className='bg-gray-200 text-sm text-black flex items-center justify-center hover:text-white hover:bg-gradient-to-tr from-fuchsia-500 to-cyan-500 space-x-2 shadow-2xl transition-all px-2 py-1 md:text-lg rounded-md'>
                            <p>fill <span className='hidden sm:inline'>code</span></p>
                            <GiBrokenPottery />
                        </button>
                        <div className='absolute whitespace-nowrap -translate-x-3 sm:translate-x-0 text-white'>{coins} coins left!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
