import Link from 'next/link'
import React from 'react'
import SvgLogo from './Home/SvgLogo'

const Header = () => {
    return (
        <div>
            <div className='flex items-center pt-10 sm:pt-16 xl:pt-20 justify-between'>
                <div className='w-[200px] mr-5'>
                    <Link href={'/'}>
                        <SvgLogo />
                    </Link>
                </div>

                <div>
                    <button className='bg-gray-800 text-white shadow-2xl hover:bg-gradient-to-r from-stone-300 to-stone-700 hover:text-transparent transition-all duration-500 hover:bg-clip-text p-3 md:text-xl font-semibold rounded-full'>
                        <p>Explore</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
