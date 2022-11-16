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
  const [name, setName] = useState("");
  const [id, setId] = useState("");

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
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/categories`,
      method: "POST",
      data: { name },
    });
    dispatch(add_category(response.data));
  };

  return (
    categories && (
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
                      setId(category._id);
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
          <form action="" onSubmit={handleSubmit}>
            <div className="form-group mt-2">
              <label htmlFor="">
                <strong>New category</strong>
              </label>
              <input
                type="text"
                className={`form-control mt-2 ${styles.createInput}`}
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <button type="submit" className={`btn btn-primary mt-2`}>
              Create
            </button>
          </form>
        </div>
        <div
          className={`col-12 d-flex justify-content-center ${styles.modalContainer}`}
        >
          <EditCategory
            display={display}
            setDisplay={setDisplay}
            setBlur={setBlur}
            id={id}
          />
        </div>
      </div>
    )
  );
}

export default Categories;
