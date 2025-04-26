// Generate mock product data
export function generateProducts(count = 20) {
  const shopNames = ["Two Good Co.", "EcoWare", "Sustainable Living", "Green Earth", "Eco Friendly", "Natural Home"]

  const productTypes = ["Kitchen", "Bathroom", "Clothing", "Accessories", "Home Decor", "Food", "Beauty"]

  const productNames = [
    "Bamboo Toothbrush",
    "Reusable Coffee Cup",
    "Organic Cotton T-Shirt",
    "Beeswax Food Wrap",
    "Stainless Steel Water Bottle",
    "Hemp Tote Bag",
    "Recycled Paper Notebook",
    "Wooden Cutlery Set",
    "Organic Soap Bar",
    "Reusable Produce Bags",
    "Biodegradable Phone Case",
    "Recycled Glass Vase",
    "Organic Cotton Socks",
    "Bamboo Cutting Board",
    "Natural Loofah Sponge",
    "Recycled Plastic Planter",
    "Organic Lip Balm",
    "Bamboo Dish Brush",
    "Recycled Wool Blanket",
    "Organic Cotton Napkins",
  ]

  const products = []

  for (let i = 0; i < count; i++) {
    const name = productNames[i % productNames.length]
    const type = productTypes[Math.floor(Math.random() * productTypes.length)]
    const shopName = shopNames[Math.floor(Math.random() * shopNames.length)]
    const price = Math.floor(Math.random() * 95) + 5 // $5 to $99

    products.push({
      id: i + 1,
      name: `${name} ${i + 1}`,
      type,
      shopName,
      price,
      image: `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(name)}`,
      description: `This sustainable ${name.toLowerCase()} is made from eco-friendly materials and designed to reduce waste. Perfect for everyday use and environmentally conscious consumers.`,
    })
  }

  return products
}
