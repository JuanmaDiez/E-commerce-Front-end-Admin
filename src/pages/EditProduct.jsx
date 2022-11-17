import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import styles from "../modules/EditProduct.module.css";

function EditProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/products/${params.id}`,
        method: "GET",
      });
      setProduct(response.data);
      setFeatured(response.data.featuredProduct);
      setCategory(response.data.category);
    };
    const getCategories = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/categories`,
        method: "GET",
      });
      setCategories(response.data);
    };
    getCategories();
    getProduct();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate("/products");
    const formData = new FormData(event.target);
    await axios({
      url: `${process.env.REACT_APP_API_URL}/products/${product._id}`,
      method: "PATCH",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    product &&
    categories && (
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <h5 className="m-3">Edit product</h5>
          <form action="" onSubmit={handleSubmit} className="container">
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                className={`form-control`}
                defaultValue={product.name}
                name="name"
              />
            </div>
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Description</label>
              <textarea
                className={`form-control`}
                defaultValue={product.description}
                name="description"
              ></textarea>
            </div>
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Category</label>
              {categories.map((category) => {
                return (
                  <div key={category._id}>
                    <label htmlFor="">{category.name}</label>
                    <input
                      type="radio"
                      className="ms-2"
                      value={category._id}
                      name="category"
                    />
                  </div>
                );
              })}
            </div>
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Image</label>
              <input type="file" className={`form-control`} name="image" />
            </div>
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Price</label>
              <input
                type="number"
                className={`form-control`}
                defaultValue={product.price}
                name="price"
              />
            </div>
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Stock</label>
              <input
                type="number"
                className={`form-control`}
                defaultValue={product.stock}
                name="stock"
              />
            </div>
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Featured</label>
              <input
                type="checkbox"
                checked={featured}
                onChange={() => setFeatured(!featured)}
                value={featured}
                name="featuredProduct"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Edit
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default EditProduct;
