import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admins from "./pages/Admins";
import Products from "./pages/Products";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import PublicRoute from "./protectedRoutes/PublicRoute";
import Orders from "./pages/Orders";
import Overview from "./pages/Overview";

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
              <Overview />
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
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
