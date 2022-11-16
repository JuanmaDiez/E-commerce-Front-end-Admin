import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateProduct from "../components/CreateProduct";
import SideBar from "../components/SideBar";
import { call_products, delete_product } from "../redux/productsSlice";
import styles from "../modules/Products.module.css";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const [display, setDisplay] = useState("d-none");
  const [blur, setBlur] = useState("null");

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/products`,
        method: "GET",
      });
      dispatch(call_products(response.data));
    };
    getProducts();
  }, []);

  const handleClick = async (id) => {
    dispatch(delete_product(id));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/products/${id}`,
      method: "DELETE",
    });
  };

  return (
    products.length && (
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10" style={{ filter: `${blur}` }}>
          <div className="d-flex justify-content-between">
            <h5 className="m-3">Products</h5>
            <button
              onClick={() => {
                setDisplay("d-flex");
                setBlur("blur(8px)");
              }}
              className="btn btn-primary m-3"
            >
              New Product
            </button>
          </div>
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
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleClick(product._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`col-12 d-flex justify-content-center ${styles.modalContainer}`}
        >
          <CreateProduct
            display={display}
            setDisplay={setDisplay}
            setBlur={setBlur}
          />
        </div>
      </div>
    )
  );
}

export default Products;
