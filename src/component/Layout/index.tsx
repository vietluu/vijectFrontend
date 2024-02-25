import React from 'react'
import Sidebar from '../Sidebar'

function Layout({ children }: {children: React.ReactNode}) {
  return (
    <div className='w-screen min-h-screen'>
      <Sidebar>
      {children}
      </Sidebar>
    </div>
  )
}

export default Layout