import React, { ReactNode } from 'react'

const LayoutPage = ({children}:{children:ReactNode}) => {
  return (
    <div className='h-screen max-h-screen overflow-hidden w-screen'>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60vw] h-[50vh] md:w-[70vw] md:h-[70vh] bg-gradient-to-t from-[#3d2e25] via-[#7a5e47] to-[#f7f4f1] rounded-full blur-3xl opacity-70"></div>
        {children}
    </div>
  )
}

export default LayoutPage