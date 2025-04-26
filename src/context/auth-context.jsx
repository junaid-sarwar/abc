"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// Create context
const AuthContext = createContext(null)

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
    firstName: "John",
    lastName: "Doe",
    phone: "555-123-4567",
    avatar: "/placeholder.svg?height=100&width=100&text=JD",
    addresses: [
      {
        id: "addr1",
        type: "Home",
        firstName: "John",
        lastName: "Doe",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        isDefault: true,
        phone: "555-123-4567",
      },
      {
        id: "addr2",
        type: "Work",
        firstName: "John",
        lastName: "Doe",
        address: "456 Business Ave",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "United States",
        isDefault: false,
        phone: "555-987-6543",
      },
    ],
  },
]

// Mock order data
const MOCK_ORDERS = [
  {
    id: "ORD-12345",
    date: "2023-04-15T10:30:00Z",
    status: "Delivered",
    total: 189.97,
    items: [
      {
        id: 1,
        name: "Premium Headphones",
        price: 129.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "Wireless Keyboard",
        price: 59.98,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    paymentMethod: "Credit Card ending in 4242",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "ORD-67890",
    date: "2023-03-22T14:15:00Z",
    status: "Processing",
    total: 259.98,
    items: [
      {
        id: 3,
        name: "Smart Watch",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 4,
        name: "Bluetooth Speaker",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    paymentMethod: "PayPal",
    shippingMethod: "Express Shipping",
  },
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse stored user data:", e)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  // Login function
  const login = (email, password) => {
    setError(null)
    // In a real app, this would be an API call
    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      // Remove password from user object before storing
      const { password, ...userWithoutPassword } = foundUser

      // Add orders to user object
      const userWithOrders = {
        ...userWithoutPassword,
        orders: MOCK_ORDERS,
      }

      setUser(userWithOrders)
      localStorage.setItem("user", JSON.stringify(userWithOrders))
      return true
    } else {
      setError("Invalid email or password")
      return false
    }
  }

  // Signup function
  const signup = (userData) => {
    setError(null)
    // Check if user already exists
    const userExists = MOCK_USERS.some((u) => u.email === userData.email)

    if (userExists) {
      setError("User with this email already exists")
      return false
    }

    // In a real app, this would be an API call to create a new user
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      ...userData,
      addresses: [],
      orders: [],
    }

    // Remove password from user object before storing
    const { password, ...userWithoutPassword } = newUser

    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))
    return true
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    navigate("/login")
  }

  // Update user profile
  const updateProfile = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return true
    }
    return false
  }

  // Add a new address
  const addAddress = (address) => {
    if (user) {
      const newAddress = {
        id: `addr${user.addresses ? user.addresses.length + 1 : 1}`,
        ...address,
      }

      // If this is the first address or marked as default, set it as default
      if (!user.addresses || user.addresses.length === 0 || address.isDefault) {
        newAddress.isDefault = true
        // If marked as default, update other addresses
        if (user.addresses) {
          user.addresses = user.addresses.map((addr) => ({
            ...addr,
            isDefault: false,
          }))
        }
      }

      const updatedAddresses = user.addresses ? [...user.addresses, newAddress] : [newAddress]
      const updatedUser = { ...user, addresses: updatedAddresses }

      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return true
    }
    return false
  }

  // Update an address
  const updateAddress = (id, updatedAddress) => {
    if (user && user.addresses) {
      // If setting this address as default, update other addresses
      if (updatedAddress.isDefault) {
        user.addresses = user.addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === id ? true : false,
        }))
      }

      const updatedAddresses = user.addresses.map((address) =>
        address.id === id ? { ...address, ...updatedAddress } : address,
      )

      const updatedUser = { ...user, addresses: updatedAddresses }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return true
    }
    return false
  }

  // Delete an address
  const deleteAddress = (id) => {
    if (user && user.addresses) {
      const deletedAddress = user.addresses.find((addr) => addr.id === id)
      const updatedAddresses = user.addresses.filter((address) => address.id !== id)

      // If the deleted address was the default, set a new default if possible
      if (deletedAddress && deletedAddress.isDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true
      }

      const updatedUser = { ...user, addresses: updatedAddresses }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      return true
    }
    return false
  }

  // Get user orders
  const getOrders = () => {
    return user?.orders || []
  }

  // Get order details
  const getOrderById = (orderId) => {
    if (user?.orders) {
      return user.orders.find((order) => order.id === orderId)
    }
    return null
  }

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    getOrders,
    getOrderById,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
