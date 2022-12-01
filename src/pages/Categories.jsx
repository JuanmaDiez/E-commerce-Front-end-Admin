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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Table } from "react-bootstrap";

function Categories() {
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
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
    toast.error("Category deleted");
    await axios({
      url: `${process.env.REACT_APP_API_URL}/categories/${id}`,
      method: "DELETE",
      headers: `Bearer ${admin.token}`,
    });
  };

  return (
    categories.length && (
      <div className="container-fluid">
        <div className="row">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="col-2 p-0">
            <SideBar />
          </div>
          <div className="col-10" style={{ filter: `${blur}` }}>
            <div className="d-flex justify-content-between m-2">
              <h4 className={`m-3 ${styles.title}`}>Categories</h4>
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
            <div className="row justify-content-center">
              <div className="col-10">
                <Table striped bordered hover>
                  <thead className="thead-light">
                    <th scope="row" className="col-1">#</th>
                    <th className="col-2">Name</th>
                    <th className="col-2">Stock</th>
                    <th className="col-3">Title</th>
                    <th className="col-1">Actions</th>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => {
                      return (
                        <tr
                          key={category._id}
                          className={`${styles.categoryRow}`}
                        >
                          <th>{index + 1}</th>
                          <td>{category.name}</td>
                          <td>{category.products.length}</td>
                          <td>{category.title}</td>
                          <td>
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
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div
            className={`col-12 d-flex justify-content-center ${styles.modalContainer}`}
          >
            <EditCategory
              display={displayEdit}
              setDisplay={setDisplayEdit}
              setBlur={setBlur}
              category={category}
              setCategory={setCategory}
            />
            <CreateCategory
              display={displayCreate}
              setDisplay={setDisplayCreate}
              setBlur={setBlur}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default Categories;
