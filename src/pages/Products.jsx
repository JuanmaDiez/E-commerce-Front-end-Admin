import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateProduct from "../components/CreateProduct";
import EditProduct from "../components/EditProduct";
import SideBar from "../components/SideBar";
import {
  call_products,
  delete_product,
  empty_products
} from "../redux/productsSlice";
import styles from "../modules/Products.module.css";
import paperBasket from "../image/paperBasket.png";
import editTools from "../image/editTools.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "react-bootstrap/Table";
import { productDelete, productIndex } from "../controllers/productController";
import { Spinner } from "react-bootstrap";
import { categoryIndex } from "../controllers/categoryController";
import { empty_admins } from "../redux/allAdminsSlice";
import { empty_categories } from "../redux/categorySlice";
import { empty_orders } from "../redux/ordersSlice";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../constants/constants";
import { PRODUCT_DELETED } from "../constants/successMessage";
import { logout } from "../redux/adminSlice";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product);
  const admin = useSelector((state) => state.admin);
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [displayModal, setDisplayModal] = useState("d-none");
  const [displayCreate, setDisplayCreate] = useState("d-none");
  const [displayEdit, setDisplayEdit] = useState("d-none");
  const [blur, setBlur] = useState("null");

  useEffect(() => {
    setIsLoading(true);
    const getProducts = async () => {
      const response = await productIndex();

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      dispatch(call_products(response.products));
    };

    const getCategories = async () => {
      const response = await categoryIndex();

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      setCategories(response.categories);
    };

    getCategories();
    getProducts();
    setIsLoading(false);
  }, []);

  const handleClick = async (id) => {
    setIsLoading(true);

    const response = await productDelete(admin.token, id);

    if (!response.success) {
      if (response.serverError || response.unauthorized) {
        dispatch(logout());
        dispatch(empty_admins());
        dispatch(empty_products());
        dispatch(empty_categories());
        dispatch(empty_orders());
        navigate(LOGIN_URL);
      }
      toast.error(response.message);
      setIsLoading(false);
      return;
    }

    dispatch(delete_product(id));
    toast.error(PRODUCT_DELETED);
    setIsLoading(false);
  };

  return isLoading ? (
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
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  ) : (
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
            <h4 className={`m-3 ${styles.title}`}>Products</h4>
            <button
              className={`btn btn-success ${styles.createProdBtn}`}
              onClick={() => {
                setDisplayModal("d-flex");
                setDisplayCreate("d-flex");
                setBlur("blur(8px)");
              }}
            >
              <strong>+</strong>
            </button>
          </div>
          <div className="row justify-content-center">
            <div className="col-10">
              {products.length > 0 ? (
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
                              product.stock === 0 ? "#FFD3D3" : "inherit"
                          }}
                        >
                          <th>{index + 1}</th>
                          <td>{product.name}</td>
                          <td>{product.stock}</td>
                          <td>${product.price}</td>
                          <td>
                            <img
                              className={`img-fluid me-3 ${styles.ctaImages}`}
                              src={editTools}
                              alt="edit"
                              onClick={() => {
                                setDisplayModal("d-flex");
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
                              className={`${styles.paperBasket} img-fluid ${styles.ctaImages}`}
                              src={paperBasket}
                              alt="delete"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <h3>No se encontraron productos</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={`col-10`} style={{ display: `${displayModal}` }}>
          <div className={`row`}></div>
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
  );
}

export default Products;
