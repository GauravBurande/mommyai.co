import Link from 'next/link'
import React from 'react'
import SvgLogo from './Home/SvgLogo'

const Header = () => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='w-[200px]'>
                    <Link href={'/'}>
                        <SvgLogo />
                    </Link>
                </div>

                <div>
                    <button className='bg-gray-800 text-white p-3 text-xl font-semibold rounded-full'>
                        Explore
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
