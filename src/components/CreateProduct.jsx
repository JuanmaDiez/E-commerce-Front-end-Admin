import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../modules/CreateProduct.module.css";
import { add_product, empty_products } from "../redux/productsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { productStore } from "../controllers/productController";
import { logout } from "../redux/adminSlice";
import { empty_admins } from "../redux/allAdminsSlice";
import { empty_categories } from "../redux/categorySlice";
import { empty_orders } from "../redux/ordersSlice";
import { LOGIN_URL } from "../constants/constants";
import { Spinner } from "react-bootstrap";
import { PRODUCT_CREATED } from "../constants/successMessage";

function CreateProduct({ display, setDisplay, setBlur, categories }) {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [image, setImage] = useState(null);
  const [featured, setFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await productStore(
      admin.token,
      name,
      description,
      category,
      price,
      stock,
      image,
      featured
    );

    if (!response.success) {
      if (response.unauthorized) {
        dispatch(logout());
        dispatch(empty_admins());
        dispatch(empty_categories());
        dispatch(empty_products());
        dispatch(empty_orders());
        navigate(LOGIN_URL);
      }
      setIsLoading(false);
      toast.error(response.message);
      return;
    }

    dispatch(add_product(response.product));
    toast.success(PRODUCT_CREATED);
    setIsLoading(false);
    setBlur("blur(0px)");
    setDisplay("d-none");
  };

  return isLoading ? (
    <div
      className={`${display} flex-column ${styles.createContainer} p-4 align-items-center justify-content-center`}
    >
      <Spinner />
    </div>
  ) : categories && categories.length > 0 ? (
    <div className={`${display} flex-column ${styles.createContainer} p-4`}>
      <div className="d-flex justify-content-between">
        <h4 className={`${styles.title}`}>Create product</h4>
        <button
          className="btn btn-dark"
          onClick={() => {
            setBlur("blur(0px)");
            setDisplay("d-none");
          }}
        >
          <strong>X</strong>
        </button>
      </div>
      <form
        action=""
        onSubmit={(event) => handleSubmit(event)}
        className="container"
      >
        <div className={`form-group mt-1`}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            className={`form-control`}
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className={`form-group mt-1`}>
          <label htmlFor="">Description</label>
          <textarea
            className={`form-control`}
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          ></textarea>
        </div>
        <div className={`form-group mt-1`}>
          <label htmlFor="">Category</label>
          <div className="d-flex justify-content-around">
            {categories.map((category) => {
              return (
                <div key={category._id}>
                  <label htmlFor="">{category.name}</label>
                  <input
                    type="radio"
                    className="ms-2"
                    value={category._id}
                    onClick={(event) => {
                      setCategory(event.target.value);
                    }}
                    name="category"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={`form-group mt-1`}>
          <label htmlFor="">Price</label>
          <input
            type="number"
            className={`form-control`}
            name="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>
        <div className={`form-group mt-1`}>
          <label htmlFor="">Stock</label>
          <input
            type="number"
            className={`form-control`}
            name="stock"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            required
          />
        </div>
        <div className={`form-group mt-1`}>
          <label htmlFor="">Featured</label>
          <input
            type="checkbox"
            name="featuredProduct"
            checked={featured}
            value={featured}
            onChange={() => setFeatured(!featured)}
          />
        </div>
        <div className={`form-group mt-1`}>
          <label htmlFor="">Image</label>
          <input
            type="file"
            className={`form-control`}
            name="image"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setImage(event.target.files[0]);
              }
            }}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-1">
          Create
        </button>
      </form>
    </div>
  ) : null;
}

export default CreateProduct;
