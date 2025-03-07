import React, { ReactNode } from 'react'

const LayoutPage = ({children}:{children:ReactNode}) => {
  return (
    <div className='bg-cream-gold'>
        {children}
    </div>
  )
}

export default LayoutPage