import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
    return (
        <div className='bg-gradient-to-br from-background to-muted'>
            <Header />
            <main className='min-h-screen container mx-auto px-4 py-8'>
                {children}
            </main>
            footer
        </div>
    )
}

export default Layout