import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import UpdateRestaurant from "./pages/UpdateRestaurant";
import { AuthProvider } from "./context/AuthContext"

export default function App (){
  return(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path ="/" element={<Login/>} />
          <Route path ="/admin/dashboard" element={<ProtectedRoute role="admin">
            <AdminDashboard/>
          </ProtectedRoute>} />
          <Route path ="/admin/restaurants/update" element={<ProtectedRoute role="admin">
            <UpdateRestaurant/>
          </ProtectedRoute>} />
          <Route path ="/customer/dashboard" element={<ProtectedRoute role="customer">
            <CustomerDashboard/>
          </ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}