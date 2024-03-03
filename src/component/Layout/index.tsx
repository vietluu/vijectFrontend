import React from 'react'
import Sidebar from '../Sidebar'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen h-screen overflow-y-auto">
            <Sidebar>{children}</Sidebar>
        </div>
    )
}

export default Layout
