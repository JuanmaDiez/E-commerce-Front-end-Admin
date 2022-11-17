import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../modules/CreateProduct.module.css";
import { add_product } from "../redux/productsSlice";

function CreateProduct({ display, setDisplay, setBlur }) {
  const dispatch = useDispatch();
  const [featured, setFeatured] = useState(false);
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/categories`,
        method: "GET",
      });
      setCategories(response.data);
    };
    getCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setBlur("blur(0px)");
    setDisplay("d-none");
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/products`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(add_product(response.data));
  };

  return (
    categories && (
      <div className={`${display} flex-column ${styles.createContainer} p-4`}>
        <div className="d-flex justify-content-between">
          <h5>Create product</h5>
          <p
            onClick={() => {
              setBlur("blur(0px)");
              setDisplay("d-none");
            }}
          >
            <strong>X</strong>
          </p>
        </div>
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
            <div className="d-flex justify-content-around">
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
    )
  );
}

export default CreateProduct;
