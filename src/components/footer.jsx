import { Link } from "react-router-dom"
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <h1 className="text-2xl font-black tracking-tighter text-white">
                TWO
                <br />
                GOOD
                <br />
                CO.
              </h1>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Creating sustainable products that make a positive impact on our community and environment.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-gray-400 hover:text-white transition-colors">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link to="/catering" className="text-gray-400 hover:text-white transition-colors">
                  Catering
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-400 hover:text-white transition-colors">
                  Impact
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-gray-400 hover:text-white transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Sustainability Way
                  <br />
                  Auckland, New Zealand
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <a href="tel:+6499999999" className="text-gray-400 hover:text-white transition-colors">
                  +64 9 999 9999
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                <a href="mailto:hello@twogood.co.nz" className="text-gray-400 hover:text-white transition-colors">
                  hello@twogood.co.nz
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest products, events, and impact stories.
            </p>
            <form className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-900 border border-gray-700 text-white focus:ring-white px-3 py-2 rounded-md w-full"
                  required
                />
                <button type="submit" className="ml-2 bg-white text-black hover:bg-gray-200 px-3 py-2 rounded-md">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </div>
        </div>

        <div className="h-px bg-gray-800 my-12"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">© {currentYear} Two Good Co. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/shipping-policy" className="text-gray-500 hover:text-white transition-colors">
              Shipping Policy
            </Link>
            <Link to="/refund-policy" className="text-gray-500 hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
