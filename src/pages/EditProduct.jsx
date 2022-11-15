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

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios({
        url: `http://localhost:8000/product/${params.id}`,
        method: "GET",
      });
      setProduct(response.data);
      setFeatured(response.data.featuredProduct);
    };
    getProduct();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate("/products");
  };

  return (
    product && (
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
              />
            </div>
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Description</label>
              <textarea
                className={`form-control`}
                defaultValue={product.description}
              ></textarea>
            </div>
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Category</label>
              <input
                type="text"
                className={`form-control`}
                defaultValue={product.category}
              />
            </div>
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Image</label>
              <input type="file" className={`form-control`} />
              <div className={`form-group ${styles.inputGroup}`}>
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  className={`form-control`}
                  defaultValue={product.price}
                />
              </div>
            </div>
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Stock</label>
              <input
                type="number"
                className={`form-control`}
                defaultValue={product.stock}
              />
            </div>
            <div className={`form-group ${styles.inputGroup}`}>
              <label htmlFor="">Featured</label>
              <input
                type="checkbox"
                checked={featured}
                onChange={() => setFeatured(!featured)}
                value={featured}
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
