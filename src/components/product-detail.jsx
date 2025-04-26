"use client"

import { ArrowLeft, Heart, ShoppingCart, Star, ChevronRight, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ProductGallery from "@/components/product-gallery"
import ProductReviews from "@/components/product-reviews"
import RelatedProducts from "@/components/related-products"
import { generateProducts } from "@/lib/data"

export default function ProductDetail({ productId }) {
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [shopProducts, setShopProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    // In a real app, you would fetch the product from an API
    const allProducts = generateProducts(50)
    const foundProduct = allProducts.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)

      // Generate some product images
      foundProduct.images = [
        `/placeholder.svg?height=600&width=600&text=Product+Image+1`,
        `/placeholder.svg?height=600&width=600&text=Product+Image+2`,
        `/placeholder.svg?height=600&width=600&text=Product+Image+3`,
        `/placeholder.svg?height=600&width=600&text=Product+Image+4`,
      ]

      // Generate product variants
      foundProduct.colors = ["Black", "White", "Blue", "Red"]
      foundProduct.sizes = ["S", "M", "L", "XL"]

      // Find related products (same type)
      const related = allProducts.filter((p) => p.type === foundProduct.type && p.id !== foundProduct.id).slice(0, 4)
      setRelatedProducts(related)

      // Find more from this shop
      const fromShop = allProducts
        .filter((p) => p.shopName === foundProduct.shopName && p.id !== foundProduct.id)
        .slice(0, 4)
      setShopProducts(fromShop)
    }
  }, [productId])

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    // In a real app, you would add the product to the cart with the selected options
    const colorInfo = selectedColor ? ` - Color: ${selectedColor}` : ""
    const sizeInfo = selectedSize ? ` - Size: ${selectedSize}` : ""
    alert(`Added ${quantity} ${product?.name}${colorInfo}${sizeInfo} to cart`)
  }

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm">
        <Button variant="ghost" size="sm" className="mr-2 p-0 h-auto" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to shop
        </Button>
        <div className="flex items-center">
          <span className="text-muted-foreground">Home</span>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="text-muted-foreground">{product.type}</span>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span>{product.name}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Gallery */}
        <ProductGallery images={product.images || [product.image]} />

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <div className="text-sm text-muted-foreground mb-1">{product.shopName}</div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(24 reviews)</span>
            </div>

            <div className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</div>

            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>

          <Separator className="mb-6" />

          {/* Color Selection */}
          {product.colors && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    className="rounded-md"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="rounded-md w-12"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button className="flex-1" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant={isWishlisted ? "default" : "outline"}
              size="lg"
              onClick={handleToggleWishlist}
              className={isWishlisted ? "bg-pink-100 text-pink-600 hover:bg-pink-200 border-pink-200" : ""}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? "fill-pink-600" : ""}`} />
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.isNew && <Badge>New Arrival</Badge>}
            {product.isFeatured && <Badge variant="secondary">Featured</Badge>}
            <Badge variant="outline">Free Shipping</Badge>
            <Badge variant="outline">In Stock</Badge>
          </div>
        </div>
      </div>
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
          <TabsTrigger
            value="description"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent py-3 px-4"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent py-3 px-4"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent data-[state=active]:bg-transparent py-3 px-4"
          >
            Reviews (24)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-6">
          <div className="prose max-w-none">
            <p>
              {product.description} This premium product is designed with attention to detail and made from high-quality
              materials to ensure durability and comfort.
            </p>
            <p className="mt-4">
              Whether you're looking for style, functionality, or both, this product delivers on all fronts. Its
              versatile design makes it perfect for various occasions, and its timeless appeal ensures it will remain a
              favorite in your collection for years to come.
            </p>
            <p className="mt-4">
              We take pride in our craftsmanship and are confident that you'll appreciate the thoughtful features and
              exceptional quality that set this product apart from the rest.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="details" className="pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Premium quality materials
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Durable construction
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Versatile design
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full p-1 mr-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Easy to maintain
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Specifications</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Brand</span>
                  <span>{product.shopName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Category</span>
                  <span>{product.type}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Material</span>
                  <span>Premium Quality</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Weight</span>
                  <span>0.5 kg</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span>25 × 15 × 5 cm</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <ProductReviews productId={productId} />
        </TabsContent>
      </Tabs>
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">More from {product.shopName}</h2>
        <RelatedProducts products={shopProducts} />
      </div>
    </div>
  )
}
