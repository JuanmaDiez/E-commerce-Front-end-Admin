import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../modules/CreateProduct.module.css";
import { add_product } from "../redux/productsSlice";

function CreateProduct({ display, setDisplay, setBlur }) {
  const dispatch = useDispatch();
  const [featured, setFeatured] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await axios({
      url: "http://localhost:8000/products",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(add_product(response.data));
    setBlur("blur(0px)");
    setDisplay("d-none");
  };

  return (
    <div className={`${display} flex-column ${styles.createContainer} p-4`}>
      <h5>Create product</h5>
      <form
        action=""
        onSubmit={(event) => handleSubmit(event)}
        className="container"
      >
        <div className={`form-group mt-1`}>
          <label htmlFor="">Name</label>
          <input type="text" className={`form-control`} name="name" />
        </div>
        <div className={`form-group mt-1`}>
          <label htmlFor="">Description</label>
          <textarea className={`form-control`} name="description"></textarea>
        </div>
        <div className={`form-group mt-1`}>
          <label htmlFor="">Category</label>
          <input type="text" className={`form-control`} name="category" />
        </div>
        <div className={`form-group mt-1`}>
          <label htmlFor="">Image</label>
          <input type="file" className={`form-control`} name="image" />
          <div className={`form-group mt-1`}>
            <label htmlFor="">Price</label>
            <input type="number" className={`form-control`} name="price" />
          </div>
        </div>
        <div className={`form-group mt-1`}>
          <label htmlFor="">Stock</label>
          <input type="number" className={`form-control`} name="stock" />
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
        <button type="submit" className="btn btn-success mt-1">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
