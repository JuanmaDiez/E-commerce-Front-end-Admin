import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admins from "./pages/Admins";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import PublicRoute from "./protectedRoutes/PublicRoute";
import Testing from "./pages/Testing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/admins"
          element={
            <PrivateRoute>
              <Admins />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </div>
  );
}

export default App;
