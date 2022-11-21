import axios from "axios";
import styles from "../modules/EditProduct.module.css";
import { useSelector } from "react-redux";

function EditProduct({
  display,
  setDisplay,
  setBlur,
  product,
  categories,
  featured,
  setFeatured,
}) {
  const admin = useSelector((state) => state.admin);

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
  };

  return (
    product &&
    categories && (
      <div className={`${display} flex-column ${styles.createContainer} p-4`}>
        <div className="d-flex justify-content-between m-2">
          <h5>Edit product</h5>
          <p
            onClick={() => {
              setDisplay("d-none");
              setBlur("blur(0px)");
            }}
          >
            <strong>X</strong>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="container">
          <div className={`form-group `}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              className={`form-control`}
              defaultValue={product.name}
              name="name"
            />
          </div>
          <div className={`form-group `}>
            <label htmlFor="">Description</label>
            <textarea
              className={`form-control`}
              defaultValue={product.description}
              name="description"
            ></textarea>
          </div>
          <div className={`form-group `}>
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
          <div className={`form-group `}>
            <label htmlFor="">Image</label>
            <input type="file" className={`form-control`} name="image" />
          </div>
          <div className={`form-group `}>
            <label htmlFor="">Price</label>
            <input
              type="number"
              className={`form-control`}
              defaultValue={product.price}
              name="price"
            />
          </div>
          <div className={`form-group `}>
            <label htmlFor="">Stock</label>
            <input
              type="number"
              className={`form-control`}
              defaultValue={product.stock}
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
          <button type="submit" className="btn btn-success">
            Edit
          </button>
        </form>
      </div>
    )
  );
}

export default EditProduct;
