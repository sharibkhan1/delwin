import Navbar from '@/components/navbar'
import React, { ReactNode } from 'react'
import Image from 'next/image'

const LayoutPage = ({children}:{children:ReactNode}) => {
  return (
    <div>
                <div className="fixed top-0 left-4">
              <Image
                src="/logo.png"
                width={1028} // Adjust width
                height={1028} // Adjust height
                alt="Furnishing Hero"
                className="object-contain"
                priority
              />
            </div>
        <Navbar />
        {children}
    </div>
  )
}

export default LayoutPage