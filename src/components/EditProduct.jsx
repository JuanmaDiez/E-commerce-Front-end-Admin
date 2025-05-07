import styles from "../modules/EditProduct.module.css";
import { edit_product, empty_products } from "../redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { productEdit } from "../controllers/productController";
import { logout } from "../redux/adminSlice";
import { empty_admins } from "../redux/allAdminsSlice";
import { empty_orders } from "../redux/ordersSlice";
import { empty_categories } from "../redux/categorySlice";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../constants/constants";
import { PRODUCT_EDITED } from "../constants/successMessage";

function EditProduct({
  display,
  setDisplay,
  setBlur,
  product,
  categories,
  featured,
  setFeatured,
  setProduct,
}) {
  const admin = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const response = await productEdit(
      admin.token,
      product._id,
      name,
      description,
      category,
      price,
      stock,
      image
    );

    if (!response.success) {
      if (response.serverError || response.unauthorized) {
        dispatch(logout());
        dispatch(empty_admins());
        dispatch(empty_products());
        dispatch(empty_orders());
        dispatch(empty_categories());
        navigate(LOGIN_URL);
      }
      toast.error(response.message);
      setIsLoading(false);
      return;
    }

    const editedProduct = response.product;

    dispatch(
      edit_product({
        id: editedProduct._id,
        name: editedProduct.name,
        stock: editedProduct.stock,
        description: editedProduct.description,
        price: editedProduct.price,
        featured: editedProduct.featured,
      })
    );

    setIsLoading(false);
    setDisplay("d-none");
    setBlur("blur(0px)");
    toast.warning(PRODUCT_EDITED);
    setProduct(null);
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
      setStock(product.stock);
    }
  }, [product]);

  return isLoading ? (
    <div
      className={`${display} flex-column ${styles.createContainer} p-4 justify-content-center align-items-center`}
    >
      <Spinner />
    </div>
  ) : product && categories ? (
    <div className={`${display} flex-column ${styles.createContainer} p-4`}>
      <div className="d-flex justify-content-between m-2">
        <h4 className={`${styles.title}`}>Edit product</h4>
        <button
          className="btn btn-dark"
          onClick={() => {
            setDisplay("d-none");
            setBlur("blur(0px)");
            setProduct(null);
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
        <div className={`form-group `}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            className={`form-control`}
            value={name}
            onChange={(event) => setName(name)}
            name="name"
          />
        </div>
        <div className={`form-group `}>
          <label htmlFor="">Description</label>
          <textarea
            className={`form-control`}
            defaultValue={description}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            name="description"
          ></textarea>
        </div>
        <div className={`form-group `}>
          <label htmlFor="">Category</label>
          {categories.map((categoryFromMap) => {
            return (
              <div key={categoryFromMap._id}>
                <label htmlFor="">{categoryFromMap.name}</label>
                {categoryFromMap._id === category ? (
                  <input
                    type="radio"
                    className="ms-2"
                    value={categoryFromMap._id}
                    name="category"
                    onClick={(event) => setCategory(event.target.value)}
                    defaultChecked
                  />
                ) : (
                  <input
                    type="radio"
                    className="ms-2"
                    value={categoryFromMap._id}
                    onClick={(event) => setCategory(event.target.value)}
                    name="category"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className={`form-group `}>
          <label htmlFor="">Price</label>
          <input
            type="number"
            className={`form-control`}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            name="price"
          />
        </div>
        <div className={`form-group `}>
          <label htmlFor="">Stock</label>
          <input
            type="number"
            className={`form-control`}
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            name="stock"
          />
        </div>
        <div className={`form-group `}>
          <label htmlFor="">Featured</label>
          <input
            type="checkbox"
            checked={featured}
            onChange={() => setFeatured(!featured)}
            value={featured}
            name="featuredProduct"
          />
        </div>
        <div className={`form-group `}>
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
          />
        </div>
        <button type="submit" className="btn btn-success">
          Edit
        </button>
      </form>
    </div>
  ) : null;
}

export default EditProduct;
