import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/auth-context"
import ProtectedRoute from "./components/protected-route"
import ProductPage from "./pages/product-page"
import ShopPage from "./pages/shop-page"
import CartPage from "./pages/cart-page"
import LoginPage from "./pages/login-page"
import SignupPage from "./pages/signup-page"
import AccountPage from "./pages/account-page"
import OrderDetailPage from "./pages/order-detail-page"
import Header from "./components/header"
import Footer from "./components/footer"

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-grow pt-24">
            {/* Added padding-top to account for fixed header */}
            <Routes>
              <Route path="/" element={<ShopPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <AccountPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account/orders/:orderId"
                element={
                  <ProtectedRoute>
                    <OrderDetailPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}
