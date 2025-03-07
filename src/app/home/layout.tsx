import Navbar from '@/components/navbar'
import React, { ReactNode } from 'react'

const LayoutPage = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default LayoutPage