"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

// Mock data for cart items
const initialCartItems = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 129.99,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 1,
  },
  {
    id: 2,
    name: "Wireless Keyboard",
    price: 59.99,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 2,
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=80&width=80",
    quantity: 1,
  },
]

// Payment methods
const paymentMethods = [
  { id: "credit-card", name: "Credit Card" },
  { id: "paypal", name: "PayPal" },
  { id: "apple-pay", name: "Apple Pay" },
]

// Shipping methods
const shippingMethods = [
  { id: "standard", name: "Standard Shipping", price: 5.99, days: "5-7 business days" },
  { id: "express", name: "Express Shipping", price: 12.99, days: "2-3 business days" },
  { id: "overnight", name: "Overnight Shipping", price: 24.99, days: "1 business day" },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card")
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("standard")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [step, setStep] = useState(1) // 1: Cart, 2: Shipping, 3: Payment, 4: Review

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Get selected shipping price
  const shippingPrice = shippingMethods.find((method) => method.id === selectedShippingMethod)?.price || 0

  // Calculate tax (assuming 8%)
  const taxRate = 0.08
  const tax = subtotal * taxRate

  // Calculate total
  const total = subtotal + shippingPrice + tax

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  // Handle shipping address change
  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle card details change
  const handleCardChange = (e) => {
    const { name, value } = e.target
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
    } else {
      // Process order
      alert("Order placed successfully!")
      // In a real app, you would send the order to your backend
    }
  }

  // Go back to previous step
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              1
            </div>
            <span className="mt-2">Cart</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div className={`flex flex-col items-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              2
            </div>
            <span className="mt-2">Shipping</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div className={`flex flex-col items-center ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              3
            </div>
            <span className="mt-2">Payment</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 4 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div className={`flex flex-col items-center ${step >= 4 ? "text-blue-600" : "text-gray-400"}`}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 4 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              4
            </div>
            <span className="mt-2">Review</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Cart Items */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-20 w-20">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatCurrency(item.price)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  className="bg-gray-200 text-gray-700 rounded-l-md px-3 py-1"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <span className="bg-gray-100 px-4 py-1">{item.quantity}</span>
                                <button
                                  type="button"
                                  className="bg-gray-200 text-gray-700 rounded-r-md px-3 py-1"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatCurrency(item.price * item.quantity)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                type="button"
                                className="text-red-600 hover:text-red-900"
                                onClick={() => removeItem(item.id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Shipping Information */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingAddress.firstName}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingAddress.lastName}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingAddress.address}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
                    <div className="space-y-4">
                      {shippingMethods.map((method) => (
                        <div key={method.id} className="flex items-center">
                          <input
                            type="radio"
                            id={method.id}
                            name="shippingMethod"
                            value={method.id}
                            checked={selectedShippingMethod === method.id}
                            onChange={() => setSelectedShippingMethod(method.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={method.id} className="ml-3 flex justify-between w-full">
                            <div>
                              <span className="block text-sm font-medium text-gray-700">{method.name}</span>
                              <span className="block text-sm text-gray-500">{method.days}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{formatCurrency(method.price)}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment Information */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center">
                          <input
                            type="radio"
                            id={method.id}
                            name="paymentMethod"
                            value={method.id}
                            checked={selectedPaymentMethod === method.id}
                            onChange={() => setSelectedPaymentMethod(method.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={method.id} className="ml-3 block text-sm font-medium text-gray-700">
                            {method.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedPaymentMethod === "credit-card" && (
                    <div className="mt-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleCardChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                          <input
                            type="text"
                            name="cardName"
                            value={cardDetails.cardName}
                            onChange={handleCardChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={cardDetails.expiryDate}
                              onChange={handleCardChange}
                              placeholder="MM/YY"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              name="cvv"
                              value={cardDetails.cvv}
                              onChange={handleCardChange}
                              placeholder="123"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPaymentMethod === "paypal" && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">
                        You will be redirected to PayPal to complete your payment after reviewing your order.
                      </p>
                    </div>
                  )}

                  {selectedPaymentMethod === "apple-pay" && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">
                        You will be able to pay with Apple Pay after reviewing your order.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Review Order */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium mb-4">Items</h3>
                  <div className="border-b pb-4 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between py-2">
                        <div className="flex">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
                  <div className="border-b pb-4 mb-4">
                    <p className="text-sm text-gray-600">
                      {shippingAddress.firstName} {shippingAddress.lastName}
                      <br />
                      {shippingAddress.address}
                      <br />
                      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                      <br />
                      {shippingAddress.country}
                    </p>
                  </div>

                  <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
                  <div className="border-b pb-4 mb-4">
                    <p className="text-sm text-gray-600">
                      {shippingMethods.find((method) => method.id === selectedShippingMethod)?.name} -
                      {shippingMethods.find((method) => method.id === selectedShippingMethod)?.days}
                    </p>
                  </div>

                  <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                  <div className="border-b pb-4 mb-4">
                    <p className="text-sm text-gray-600">
                      {paymentMethods.find((method) => method.id === selectedPaymentMethod)?.name}
                      {selectedPaymentMethod === "credit-card" && cardDetails.cardNumber && (
                        <span> ending in {cardDetails.cardNumber.slice(-4)}</span>
                      )}
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-gray-500 mb-4">
                      By placing your order, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
                >
                  Back
                </button>
              ) : (
                <Link to="/products" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">
                  Continue Shopping
                </Link>
              )}

              {cartItems.length > 0 && (
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  {step < 4 ? "Continue" : "Place Order"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
                </span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{formatCurrency(shippingPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl">{formatCurrency(total)}</span>
              </div>
            </div>

            {step === 1 && (
              <div className="mt-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium">Free returns within 30 days</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium">Secure checkout</span>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="mt-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
