import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Functions from '../components/Functions'
import Footer from '../components/Footer'
import Steps from '../components/Steps'
function Home() {
  return (
    <div>
      <Hero/>
      <Features/>
      <Functions/>
      {/* <Steps/> */}
      <Footer/>
    </div>
  )
}

export default Home
