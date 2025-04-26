"use client"

import { useParams } from "react-router-dom"
import ProductDetail from "../components/product-detail"

export default function ProductPage() {
  const { id } = useParams()
  return <ProductDetail productId={id} />
}
