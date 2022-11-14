import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateProduct from "../components/CreateProduct";
import SideBar from "../components/SideBar";
import { call_products } from "../redux/productsSlice";
import styles from "../modules/Products.module.css";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const [display, setDisplay] = useState("d-none");

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        url: "http://localhost:8000/product",
        method: "GET",
      });
      dispatch(call_products(response.data));
    };
    getProducts();
  }, []);

  return (
    products && (
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <h5 className="m-3">Products</h5>
          {products.map((product, index) => {
            return (
              <div
                key={product._id}
                className={`d-flex justify-content-around p-4 ${styles.productRow}`}
              >
                <small>{index + 1}</small>
                <p>
                  <strong>Name:</strong> {product.name}
                </p>
                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <div>
                  <Link
                    to={`/products/edit/${product._id}`}
                    className={`btn btn-warning ${styles.editButton}`}
                  >
                    Edit
                  </Link>
                  <button className="btn btn-danger">Delete</button>
                </div>
              </div>
            );
          })}
          <button
            onClick={() => setDisplay("d-flex")}
            className="btn btn-primary mt-4"
          >
            New Product
          </button>
        </div>
        <CreateProduct display={display} setDisplay={setDisplay} />
      </div>
    )
  );
}

export default Products;
