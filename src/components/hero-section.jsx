import { Link } from "react-router-dom"

export default function HeroSection() {
  return (
    <div className="relative bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
      <div
        className="h-[400px] bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=400&width=1920')" }}
      ></div>
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1920px] absolute inset-0 z-20 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Sustainable Products</h1>
        <p className="text-lg md:text-xl max-w-lg mb-8">
          Discover our range of eco-friendly products that make a positive impact on our community and environment.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/shop"
            className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            to="/impact"
            className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
          >
            Our Impact
          </Link>
        </div>
      </div>
    </div>
  )
}
