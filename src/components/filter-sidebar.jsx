"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function FilterSidebar({ isOpen, onClose, filters, onFilterChange, products }) {
  const [uniqueShops, setUniqueShops] = useState([])
  const [uniqueTypes, setUniqueTypes] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [maxPrice, setMaxPrice] = useState(1000)

  useEffect(() => {
    if (products.length > 0) {
      // Extract unique shop names
      const shops = [...new Set(products.map((p) => p.shopName))]
      setUniqueShops(shops)

      // Extract unique product types
      const types = [...new Set(products.map((p) => p.type))]
      setUniqueTypes(types)

      // Find max price
      const max = Math.max(...products.map((p) => p.price))
      setMaxPrice(Math.ceil(max / 100) * 100) // Round up to nearest hundred
      setPriceRange([0, max])
    }
  }, [products])

  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value })
  }

  const handleShopChange = (shop) => {
    const newShops = filters.shopName.includes(shop)
      ? filters.shopName.filter((s) => s !== shop)
      : [...filters.shopName, shop]
    onFilterChange({ shopName: newShops })
  }

  const handleTypeChange = (type) => {
    const newTypes = filters.productType.includes(type)
      ? filters.productType.filter((t) => t !== type)
      : [...filters.productType, type]
    onFilterChange({ productType: newTypes })
  }

  const handlePriceChange = (value) => {
    setPriceRange(value)
    onFilterChange({
      priceRange: { min: value[0], max: value[1] },
    })
  }

  const clearFilters = () => {
    onFilterChange({
      search: "",
      shopName: [],
      productType: [],
      priceRange: { min: 0, max: maxPrice },
    })
    setPriceRange([0, maxPrice])
  }

  // Custom Accordion implementation
  const [openSections, setOpenSections] = useState(["price", "shop", "type"])

  const toggleSection = (section) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={handleSearchChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
        />
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Filters</h3>
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3"
            onClick={clearFilters}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {/* Price Range Accordion */}
        <div className="border-b pb-2">
          <div className="flex items-center justify-between py-2 cursor-pointer" onClick={() => toggleSection("price")}>
            <h3 className="font-medium">Price Range</h3>
            <span>{openSections.includes("price") ? "▲" : "▼"}</span>
          </div>
          {openSections.includes("price") && (
            <div className="space-y-4 py-2">
              <div className="relative pt-5">
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange([Number.parseInt(e.target.value), filters.priceRange.max])}
                  className="w-full"
                />
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange([filters.priceRange.min, Number.parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>${filters.priceRange.min}</span>
                <span>${filters.priceRange.max}</span>
              </div>
            </div>
          )}
        </div>

        {/* Shop Accordion */}
        <div className="border-b pb-2">
          <div className="flex items-center justify-between py-2 cursor-pointer" onClick={() => toggleSection("shop")}>
            <h3 className="font-medium">Shop</h3>
            <span>{openSections.includes("shop") ? "▲" : "▼"}</span>
          </div>
          {openSections.includes("shop") && (
            <div className="space-y-2 py-2">
              {uniqueShops.map((shop) => (
                <div key={shop} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`shop-${shop}`}
                    checked={filters.shopName.includes(shop)}
                    onChange={() => handleShopChange(shop)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`shop-${shop}`} className="text-sm">
                    {shop}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Type Accordion */}
        <div className="border-b pb-2">
          <div className="flex items-center justify-between py-2 cursor-pointer" onClick={() => toggleSection("type")}>
            <h3 className="font-medium">Product Type</h3>
            <span>{openSections.includes("type") ? "▲" : "▼"}</span>
          </div>
          {openSections.includes("type") && (
            <div className="space-y-2 py-2">
              {uniqueTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`type-${type}`}
                    checked={filters.productType.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor={`type-${type}`} className="text-sm">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-background p-0 shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={onClose} className="rounded-md p-1 hover:bg-muted">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0 border rounded-lg overflow-hidden">{sidebarContent}</div>
    </>
  )
}
