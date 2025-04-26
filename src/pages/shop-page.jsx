"use client"

import { useState, useEffect } from "react"
import { Filter, Grid, List } from "lucide-react"
import ProductGrid from "../components/product-grid"
import FilterSidebar from "../components/filter-sidebar"
import HeroSection from "../components/hero-section"
import { generateProducts } from "../lib/data"

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isGridView, setIsGridView] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
    shopName: [],
    productType: [],
    priceRange: { min: 0, max: 1000 },
  })

  useEffect(() => {
    // In a real app, you would fetch products from an API
    const data = generateProducts()
    setProducts(data)
    setFilteredProducts(data)
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, products])

  const applyFilters = () => {
    let result = [...products]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) || product.shopName.toLowerCase().includes(searchLower),
      )
    }

    // Apply shop name filter
    if (filters.shopName.length > 0) {
      result = result.filter((product) => filters.shopName.includes(product.shopName))
    }

    // Apply product type filter
    if (filters.productType.length > 0) {
      result = result.filter((product) => filters.productType.includes(product.type))
    }

    // Apply price range filter
    result = result.filter(
      (product) => product.price >= filters.priceRange.min && product.price <= filters.priceRange.max,
    )

    setFilteredProducts(result)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleView = () => {
    setIsGridView(!isGridView)
  }

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 max-w-[1920px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Our Products</h1>
          <div className="flex gap-2">
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              onClick={toggleSidebar}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
              onClick={toggleView}
            >
              {isGridView ? (
                <>
                  <List className="h-4 w-4 mr-2" />
                  List
                </>
              ) : (
                <>
                  <Grid className="h-4 w-4 mr-2" />
                  Grid
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <FilterSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            products={products}
          />

          <div className="flex-1">
            <ProductGrid products={filteredProducts} isGridView={isGridView} />
          </div>
        </div>
      </div>
    </div>
  )
}
