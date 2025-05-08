import React from 'react'
import Navbar from '../Components/Layouts/Navbar'
import Footer from '../Components/Layouts/Footer'

function MainLayout({ children }) {
  console.log(children)
  return (
    <div>
    <Navbar/>
    {children}
    <Footer />
  </div>
  )
}

export default MainLayout