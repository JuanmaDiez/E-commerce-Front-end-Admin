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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "react-bootstrap/Table";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  const admin = useSelector((state) => state.admin);
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
    toast.error("Product deleted");
    await axios({
      url: `${process.env.REACT_APP_API_URL}/products/${id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${admin.token}` },
    });
  };

  return (
    products.length &&
    categories && (
      <div className="container-fluid">
        <div className={`row`}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="col-2 p-0">
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
            <div className="row justify-content-center">
              <div className="col-10">
                <Table striped bordered hover>
                  <thead className="thead-light">
                    <tr>
                      <th scope="row" className="col-1">
                        #
                      </th>
                      <th className="col-2">Name</th>
                      <th className="col-2">Stock</th>
                      <th className="col-2">Price</th>
                      <th className="col-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      return (
                        <tr
                          key={product._id}
                          className={`${styles.productRow}`}
                          style={{
                            backgroundColor:
                              product.stock === 0 ? "#FFD3D3" : "inherit",
                          }}
                        >
                          <th>{index + 1}</th>
                          <td>{product.name}</td>
                          <td>{product.stock}</td>
                          <td>${product.price}</td>
                          <td>
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
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
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
                  setProduct={setProduct}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Products;
