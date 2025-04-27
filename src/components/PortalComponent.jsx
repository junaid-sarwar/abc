import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createPortal } from "react-dom";

gsap.registerPlugin(ScrollTrigger);

const PortalComponent = () => {
  const portalRef = useRef(null);

  useEffect(() => {
    if (!portalRef.current) return;

    gsap.set(portalRef.current, {
      scale: 0.2,
      opacity: 0,
      transformOrigin: "center center",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#portal-trigger",
        start: "top 80%",
        end: "top 30%",
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    });

    tl.to(portalRef.current, {
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power4.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return createPortal(
    <div
      ref={portalRef}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-[#0c0c0c] via-[#E35938] to-[#0c0c0c] flex justify-center items-center pointer-events-none"
    >
      <div className="w-[90%] max-w-6xl bg-[#1a1a1a] text-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10 relative">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1606813904835-5ab6d51d1c51"
              alt="product"
              className="rounded-2xl w-full h-auto object-cover shadow-md"
            />
            <button className="absolute top-4 left-4 bg-[#E35938] hover:bg-[#c14428] text-white text-xs font-bold py-1 px-3 rounded-lg shadow-md">
              Try Now (VR)
            </button>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Premium Wireless Headphones
            </h2>
            <p className="text-sm text-gray-300">
              Experience immersive sound quality with these cutting-edge wireless
              headphones. Comfortable, stylish, and perfect for everyday use.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#E35938] hover:bg-[#c14428] transition text-white font-bold py-3 px-6 rounded-full shadow-lg">
                Buy Now
              </button>
              <button className="border-2 border-[#E35938] hover:bg-[#E35938] transition text-white font-bold py-3 px-6 rounded-full">
                Bargain
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PortalComponent;
