import React, { useRef, useState } from 'react'
import HeroSection from '../components/HeroSection-Gsap'
import PortalComponent from "../components/PortalComponent";

const HomePage = () => {
    const nextSectionRef = useRef(null);
  const [showPortal, setShowPortal] = useState(false);
  return (
    <>
      {/* <CustomCursor /> */}
      {/* <Navbar /> */}
      {/* <section className="bg-blue-400 font-[Gilroy-ExtraBold] text-[clamp(2vw,10vw,10vw)] font-bold uppercase text-white whitespace-nowrap pl-[5vw]">
        Below
      </section> */}
      <HeroSection nextSectionRef={nextSectionRef} setShowPortal={setShowPortal} />
      <section className="h-[150vh] bg-gray-900 relative">
        <div className="h-[100vh]"></div> {/* Padding space */}
        <div id="portal-trigger" className="h-[100vh]"></div>
        {showPortal && <PortalComponent />}
      </section>

      {/* <String /> */}
    </>
  )
}

export default HomePage