import axios from "axios";
import styles from "../modules/EditProduct.module.css";
import { edit_product } from "../redux/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

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
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [stock, setStock] = useState(null);
  const [price, setPrice] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setDisplay("d-none");
    setBlur("blur(0px)");
    await axios({
      url: `${process.env.REACT_APP_API_URL}/products/${product._id}`,
      method: "PATCH",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${admin.token}`,
      },
    });
    dispatch(
      edit_product({
        id: product._id,
        name: name || product.name,
        stock: stock || product.stock,
        description: description || product.description,
        price: price || product.price,
        featured,
      })
    );
    toast.warning("Product edited!");
    setProduct(null);
  };

  return (
    product &&
    categories && (
      <div className={`${display} flex-column ${styles.createContainer} p-4`}>
        <div className="d-flex justify-content-between m-2">
          <h4 className={`${styles.title}`}>Edit product</h4>
          <p
            onClick={() => {
              setDisplay("d-none");
              setBlur("blur(0px)");
              setProduct(null);
            }}
          >
            <strong>X</strong>
          </p>
        </div>
        <form
          action=""
          onSubmit={(event) => handleSubmit(event)}
          encType="multipart/form-data"
          className="container"
        >
          <div className={`form-group `}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              className={`form-control`}
              defaultValue={product.name}
              onChange={(event) => setName(event.target.value)}
              name="name"
            />
          </div>
          <div className={`form-group `}>
            <label htmlFor="">Description</label>
            <textarea
              className={`form-control`}
              defaultValue={product.description}
              onChange={(event) => setDescription(event.target.value)}
              name="description"
            ></textarea>
          </div>
          <div className={`form-group `}>
            <label htmlFor="">Category</label>
            {categories.map((category) => {
              return (
                <div key={category._id}>
                  <label htmlFor="">{category.name}</label>
                  {category._id === product.category ? (
                    <input
                      type="radio"
                      className="ms-2"
                      value={category._id}
                      name="category"
                      defaultChecked
                    />
                  ) : (
                    <input
                      type="radio"
                      className="ms-2"
                      value={category._id}
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
              defaultValue={product.price}
              onChange={(event) => setPrice(event.target.value)}
              name="price"
            />
          </div>
          <div className={`form-group `}>
            <label htmlFor="">Stock</label>
            <input
              type="number"
              className={`form-control`}
              defaultValue={product.stock}
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
            <input type="file" className={`form-control`} name="image" />
          </div>
          <button type="submit" className="btn btn-success">
            Edit
          </button>
        </form>
      </div>
    )
  );
}

export default EditProduct;
