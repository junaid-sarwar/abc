import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ nextSectionRef, setShowPortal }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const oRef = useRef(null);

  useEffect(() => {
    // Set initial styles for oRef
    gsap.set(oRef.current, {
      scale: 1,
      x: "0%",
      opacity: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 3,
        pin: true,
        pinSpacing: true,
      },
    });

    // Move text left
    tl.to(textRef.current, {
      x: "-60%",
      ease: "power2.out",
      duration: 2,
    });

    // Scale and move the "O" letter
    tl.to(
      oRef.current,
      {
        scale: 8,
        x: "-50%",
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        onStart: () => {
          console.log("Portal is showing!");
          setShowPortal(true);
        },
        onReverseComplete: () => {
          console.log("Portal is hidden!");
          setShowPortal(false);
        },
      },
      "<" // Start at same time as text movement
    );

    return () => tl.kill();
  }, [setShowPortal]);

  return (
    <section
      ref={heroRef}
      className="h-screen w-full font-Poppins bg-[#E35938] flex items-center justify-start overflow-hidden px-4 sm:px-8 relative"
    >
      <h1
        ref={textRef}
        className="text-[clamp(5vw,17vw,20vw)] font-bold uppercase text-white whitespace-nowrap pl-[5vw]"
      >
        Experience With S
        <span
          ref={oRef}
          className="inline-block text-white origin-center"
        >
          O
        </span>
        UQH
      </h1>
    </section>
  );
};

export default HeroSection;
