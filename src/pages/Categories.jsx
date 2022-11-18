import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import {
  add_category,
  call_categories,
  delete_category,
} from "../redux/categorySlice";
import EditCategory from "../components/EditCategory";
import styles from "../modules/Categories.module.css";

function Categories() {
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("d-none");
  const [blur, setBlur] = useState("null");
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/categories`,
        method: "GET",
      });
      dispatch(call_categories(response.data));
    };
    getCategories();
  }, []);

  const handleClick = async (id) => {
    dispatch(delete_category(id));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/categories/${id}`,
      method: "DELETE",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/categories`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(add_category(response.data));
  };

  return (
    categories.length && (
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10" style={{ filter: `${blur}` }}>
          <h5 className="m-3">Categories list</h5>
          {categories.map((category, index) => {
            return (
              <div
                key={category._id}
                className={`d-flex justify-content-around ${styles.categoryRow} p-4`}
              >
                <small>{index + 1}</small>
                <p>
                  <strong>Name:</strong> {category.name}
                </p>
                <p>
                  <strong>Amount products:</strong> {category.products.length}
                </p>
                <div>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      setBlur("blur(8px)");
                      setDisplay("d-flex");
                      setCategory(category);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-1"
                    onClick={() => handleClick(category._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          <h5 className="m-2">New category</h5>
          <div className="d-flex justify-content-center">
            <form
              action=""
              onSubmit={(event) => handleSubmit(event)}
              className="container m-2"
            >
              <div className={`form-group mt-1`}>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className={`form-control`}
                  name="name"
                  required
                />
              </div>
              <div className={`form-group mt-1`}>
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  className={`form-control`}
                  name="title"
                  required
                />
              </div>
              <div className={`form-group mt-1`}>
                <label htmlFor="">Subtitle</label>
                <input
                  type="text"
                  className={`form-control`}
                  name="subtitle"
                  required
                />
              </div>
              <div className={`form-group mt-1`}>
                <label htmlFor="">Tip</label>
                <input type="text" className={`form-control`} name="tip" />
              </div>
              <div className={`form-group mt-1`}>
                <label htmlFor="">Incentive</label>
                <input
                  type="text"
                  className={`form-control`}
                  name="incentive"
                  required
                />
              </div>
              <div className={`form-group mt-1`}>
                <label htmlFor="">Description</label>
                <textarea
                  type="text"
                  className={`form-control`}
                  name="description"
                  required
                ></textarea>
              </div>
              <div className={`form-group mt-1`}>
                <label htmlFor="">Image 1</label>
                <input
                  type="file"
                  className={`form-control`}
                  name="image1"
                  required
                />
              </div>
              <div className={`form-group mt-1`}>
                <label htmlFor="">Image 2</label>
                <input
                  type="file"
                  className={`form-control`}
                  name="image2"
                  required
                />
              </div>
              <div className={`form-group mt-1`}>
                <label htmlFor="">Image 3</label>
                <input
                  type="file"
                  className={`form-control`}
                  name="image3"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success mt-2">
                Create
              </button>
            </form>
          </div>
        </div>
        <div
          className={`col-12 d-flex justify-content-center ${styles.modalContainer}`}
        >
          <EditCategory
            display={display}
            setDisplay={setDisplay}
            setBlur={setBlur}
            category={category}
          />
        </div>
      </div>
    )
  );
}

export default Categories;
