import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { call_categories, delete_category } from "../redux/categorySlice";
import styles from "../modules/Categories.module.css";

function Categories() {
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios({
        url: "http://localhost:8000/categories",
        method: "GET",
      });

      dispatch(call_categories(response.data));
    };
    getCategories();
  }, []);

  const handleClick = async (id) => {
    dispatch(delete_category(id));
    await axios({
      url: `http://localhost:8000/categories/${id}`,
      method: "DELETE",
    });
  };

  return (
    categories && (
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10">
          <h5 className="m-3">Categories list</h5>
          {categories.map((category, index) => {
            return (
              <div
                key={category._id}
                className={`d-flex justify-content-around ${styles.categoryRow} p-4`}
              >
                <small>{index + 1}</small>
                <p>
                  <strong>Name:</strong> {category.firstname} {category.lastname}
                </p>
                <p>
                  <strong>Email:</strong> {category.email}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleClick(category._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default Categories;