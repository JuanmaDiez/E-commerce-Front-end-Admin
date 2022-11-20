import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateProduct from "../components/CreateProduct";
import EditProduct from "../components/EditProduct";
import SideBar from "../components/SideBar";
import { call_products, delete_product } from "../redux/productsSlice";
import styles from "../modules/Products.module.css";
import paperBasket from "../image/paperBasket.png";
import editTools from "../image/editTools.png";
import newProduct from "../image/new.png";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const [categories, setCategories] = useState(null);
  const [product, setProduct] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [displayCreate, setDisplayCreate] = useState("d-none");
  const [displayEdit, setDisplayEdit] = useState("d-none");
  const [blur, setBlur] = useState("null");

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/products`,
        method: "GET",
      });
      dispatch(call_products(response.data));
    };
    const getCategories = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/categories`,
        method: "GET",
      });
      setCategories(response.data);
    };
    getCategories();
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
    products.length &&
    categories && (
      <div className={`row ${styles.sidebarContainer}`}>
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10" style={{ filter: `${blur}` }}>
          <div className="d-flex justify-content-between">
            <h5 className="m-3">Products</h5>
            <img
              src={newProduct}
              alt="newProduct"
              onClick={() => {
                setDisplayCreate("d-flex");
                setBlur("blur(8px)");
              }}
              className="m-3"
            />
          </div>
          <div className="row mt-1">
            <div className="col-1"></div>
            <h5 className="col-3">
              <strong>Name</strong>
            </h5>
            <h5 className="col-3">
              <strong>Stock</strong>
            </h5>
            <h5 className="col-3">
              <strong>Price</strong>
            </h5>
            <h5 className="col-2">
              <strong>Actions</strong>
            </h5>
          </div>
          {products.map((product, index) => {
            return (
              <div
                key={product._id}
                className={`row mt-2 ${styles.productRow}`}
              >
                <small className="col-1">{index + 1}</small>
                <p className="col-3">{product.name}</p>
                <p className="col-3">{product.stock}</p>
                <p className="col-3">${product.price}</p>
                <div className="col-2">
                  <img
                    className="img-fluid me-3"
                    src={editTools}
                    alt="edit"
                    onClick={() => {
                      setDisplayEdit("d-flex");
                      setBlur("blur(8px)");
                      setProduct(product);
                      setFeatured(product.featuredProduct);
                    }}
                  />
                  <img
                    onClick={() => {
                      handleClick(product._id);
                    }}
                    className={`${styles.paperBasket} img-fluid`}
                    src={paperBasket}
                    alt="delete"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`col-12 d-flex justify-content-center ${styles.modalContainer}`}
        >
          <CreateProduct
            display={displayCreate}
            setDisplay={setDisplayCreate}
            setBlur={setBlur}
            categories={categories}
          />
          <EditProduct
            display={displayEdit}
            setDisplay={setDisplayEdit}
            setBlur={setBlur}
            categories={categories}
            product={product}
            featured={featured}
            setFeatured={setFeatured}
          />
        </div>
      </div>
    )
  );
}

export default Products;
