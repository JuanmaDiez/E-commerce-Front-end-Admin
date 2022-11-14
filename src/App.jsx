import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admins from "./pages/Admins";
import Products from "./pages/Products";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
