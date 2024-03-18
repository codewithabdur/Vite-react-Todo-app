import React from 'react'
import {NavBar} from "../../Component"
import {HeroSection} from "../../Container"

const Homepage = () => {
  return (
    <>
      <div className='bg-[#93b9ff] min-h-screen'>
        <NavBar />
        <HeroSection />
      </div>
    </>
  );
}

export default Homepage