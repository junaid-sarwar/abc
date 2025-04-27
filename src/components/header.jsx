"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, X, Sun, Moon } from "lucide-react"
import LogoPic from '../assets/souqh-no-bg-logo.png'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState("light")

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    // In a real app, you would apply the theme to the document here
  }

  return (
    <>
      {/* Fixed header container with glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className={`backdrop-blur-md bg-white/50 transition-all duration-300 ${isScrolled ? "shadow-lg" : ""}`}>
          <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 flex justify-between items-center max-w-[1920px]">
            {/* Logo - Left Side with background - Scrolls with page */}
            <div
              className={`relative z-10 mt-2  p-3 rounded-md transition-all duration-300 ${isScrolled ? "transform translate-y-0" : ""
                }`}
            >
              <Link to="/" className="block">
                {isScrolled ? (
                  /* Scrolled Logo - Arabic version */
                  <div className="h-12 w-auto">
                    <img
                      src={LogoPic}
                      alt="SOUQH Logo"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                ) : (
                  /* Default Logo - English version */
                  <div className="h-12 w-auto">
                    <img
                      src={LogoPic}
                      alt="SOUQH Logo"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                )}
              </Link>
            </div>

            {/* Fixed Navigation Links - Desktop Only - Right aligned */}
            <div className="hidden lg:flex items-center absolute right-[180px] top-1/2 transform -translate-y-1/2">
              <nav>
                <ul className="flex items-center">
                  {[
                    { name: "SHOP", path: "/shop" },
                    { name: "CART", path: "/cart" },
                    { name: "ACCOUNT", path: "/account" },
                    { name: "ORDERS", path: "/order-detail-page" }
                  ].map((item) => (
                    <li key={item.name} className="relative group px-5">
                      <Link
                        to={item.path}
                        className="font-medium text-black hover:text-yellow-400 transition-colors py-2 inline-block whitespace-nowrap"
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>


            {/* Cart and Menu with background - Scrolls with page */}
            <div
              className={`relative z-10 flex items-center bg-transparent p-2 rounded-md transition-all duration-300 ${isScrolled ? "transform translate-y-0" : ""
                }`}
            >
              {/* Cart Button */}
              <Link to="/cart" className="p-2 relative">
                <ShoppingCart className="h-6 w-6 text-black" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Menu Button */}
              <div className="flex items-center">
                <button className="p-2 ml-1" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
                  <div className="w-6 flex flex-col items-center justify-center">
                    <span className="block w-6 h-0.5 bg-black mb-1.5"></span>
                    <span className="block w-6 h-0.5 bg-black"></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black text-white z-[100] overflow-auto">
          <div className="h-full flex flex-col">
            {/* Top Navigation Bar */}
            <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 flex justify-between items-center max-w-[1920px]">
              {/* Logo */}
              <div className="mt-2 bg-black p-3 rounded-md">
                <Link to="/" className="block">
                  <div className="h-12 w-auto">
                    <img
                      src={LogoPic}
                      alt="SOUQH Logo"
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </Link>
              </div>

              {/* Close, Theme Toggle, and Cart Buttons */}
              <div className="flex items-center space-x-4">
                {/* Dark Mode Toggle in Menu */}
                <button
                  onClick={toggleTheme}
                  className="text-white p-2 transition-transform hover:scale-110"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white p-2 transition-transform hover:scale-110"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
                <Link to="/cart" className="p-2 relative text-white transition-transform hover:scale-110">
                  <ShoppingCart className="h-6 w-6" />
                </Link>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
              {/* Main Navigation Links - Right Aligned */}
              <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 flex-1 max-w-[1920px]">
                <ul className="text-right space-y-4">
                  {[
                    { name: "SHOP", path: "/shop" },
                    { name: "CART", path: "/cart" },
                    { name: "ACCOUNT", path: "/account" },
                    { name: "ORDERS", path: "/order-detail-page" },
                    { name: "LOGIN", path: "/login" },
                    { name: "SIGN UP", path: "/signup" }
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className="text-4xl md:text-6xl font-bold hover:text-yellow-400 transition-colors inline-block relative group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                        <span className="absolute bottom-2 right-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-in-out origin-right"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>


              {/* Footer Links - Three Columns */}
              <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 mt-auto max-w-[1920px]">
                <div className="grid grid-cols-3 gap-4">
                  {/* Connect With Us */}
                  <div>
                    <h3 className="text-gray-500 uppercase text-sm tracking-wider mb-6">
                      Connect
                      <br />
                      With Us
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          to="#"
                          className="text-black text-lg hover:text-yellow-400 transition-colors relative group inline-block"
                        >
                          Facebook
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-black text-lg hover:text-yellow-400 transition-colors relative group inline-block"
                        >
                          Instagram
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-black text-lg hover:text-yellow-400 transition-colors relative group inline-block"
                        >
                          Twitter
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-black text-lg hover:text-yellow-400 transition-colors relative group inline-block"
                        >
                          LinkedIn
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-black text-lg hover:text-yellow-400 transition-colors relative group inline-block"
                        >
                          YouTube
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Nitty Gritties */}
                  <div>
                    <h3 className="text-gray-500 uppercase text-sm tracking-wider mb-6">
                      Nitty
                      <br />
                      Gritties
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          to="#"
                          className="text-black text-lg hover:text-yellow-400 transition-colors relative group inline-block"
                        >
                          Good
                          <br />
                          Things
                          <br />
                          FAQs
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-black text-lg hover:text-yellow-400 transition-colors relative group inline-block"
                        >
                          Good Food
                          <br />
                          FAQs
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          className="text-black text-lg hover:text-yellow-400 transition-colors relative group inline-block"
                        >
                          Good
                          <br />
                          Places
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Get Started */}
                  <div>
                    <h3 className="text-gray-500 uppercase text-sm tracking-wider mb-6">
                      Get
                      <br />
                      Started
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link
                          to="#"
                          className="text-black text-lg hover:text-yellow-400 transition-colors relative group inline-block"
                        >
                          Pathways
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-gray-500 text-lg">
                          Careers
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
