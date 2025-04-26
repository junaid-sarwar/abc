import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"

export default function ProductGrid({ products, isGridView }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-gray-500 mb-4">No products found matching your criteria.</p>
        <p className="text-gray-400">Try adjusting your filters or search term.</p>
      </div>
    )
  }

  if (isGridView) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className="w-full aspect-square object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            to={`/product/${product.id}`}
            className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.shopName}</p>
          </div>
          <span className="font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <button className="w-full mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}

function ProductListItem({ product }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-4">
      <div className="sm:w-48 h-48">
        <img
          src={product.image || "/placeholder.svg?height=200&width=200"}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.shopName}</p>
            </div>
            <span className="font-semibold">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">{product.description}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
