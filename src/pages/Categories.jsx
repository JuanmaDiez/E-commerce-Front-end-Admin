import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import { call_categories, delete_category } from "../redux/categorySlice";
import EditCategory from "../components/EditCategory";
import styles from "../modules/Categories.module.css";
import editTools from "../image/editTools.png";
import paperBasket from "../image/paperBasket.png";
import CreateCategory from "../components/CreateCategory";
import newCategory from "../image/new.png";

function Categories() {
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [displayEdit, setDisplayEdit] = useState("d-none");
  const [blur, setBlur] = useState("null");
  const [displayCreate, setDisplayCreate] = useState("d-none");
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

  return (
    categories.length && (
      <div className="row">
        <div className="col-2">
          <SideBar />
        </div>
        <div className="col-10" style={{ filter: `${blur}` }}>
          <div className="d-flex justify-content-between m-2">
            <h5 className="m-3">Categories list</h5>
            <img
              src={newCategory}
              alt="newCategory"
              className={` m-3`}
              onClick={() => {
                setDisplayCreate("d-flex");
                setBlur("blur(8px)");
              }}
            />
          </div>
          <div className="row mt-4">
            <div className="col-1"></div>
            <h5 className="col-3">
              <strong>Name</strong>
            </h5>
            <h5 className="col-3">
              <strong>Stock</strong>
            </h5>
            <h5 className="col-3">
              <strong>Title</strong>
            </h5>
            <h5 className="col-2">
              <strong>Actions</strong>
            </h5>
          </div>
          {categories.map((category, index) => {
            return (
              <div
                key={category._id}
                className={`row ${styles.categoryRow} mt-3`}
              >
                <small className="col-1">{index + 1}</small>
                <p className="col-3">{category.name}</p>
                <p className="col-3">{category.products.length}</p>
                <p className="col-3">{category.title}</p>
                <div className="col-2">
                  <img
                    src={editTools}
                    alt="edit"
                    onClick={() => {
                      setBlur("blur(8px)");
                      setDisplayEdit("d-flex");
                      setCategory(category);
                    }}
                  />
                  <img
                    className="ms-3"
                    src={paperBasket}
                    alt="delete"
                    onClick={() => handleClick(category._id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`col-12 d-flex justify-content-center ${styles.modalContainer}`}
        >
          <EditCategory
            display={displayEdit}
            setDisplay={setDisplayEdit}
            setBlur={setBlur}
            category={category}
          />
          <CreateCategory
            display={displayCreate}
            setDisplay={setDisplayCreate}
            setBlur={setBlur}
          />
        </div>
      </div>
    )
  );
}

export default Categories;
