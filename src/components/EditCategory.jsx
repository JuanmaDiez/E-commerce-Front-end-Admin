import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "../modules/EditCategory.module.css";
import { edit_category, empty_categories } from "../redux/categorySlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { categoryEdit } from "../controllers/categoryController";
import { empty_admins } from "../redux/allAdminsSlice";
import { empty_orders } from "../redux/ordersSlice";
import { empty_products } from "../redux/productsSlice";
import { logout } from "../redux/adminSlice";
import { useNavigate } from "react-router-dom";

function EditCategory({ display, setDisplay, setBlur, category, setCategory }) {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [tip, setTip] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [incentive, setIncentive] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await categoryEdit(
      admin.token,
      category._id,
      name,
      tip,
      subtitle,
      incentive,
      description,
      image1,
      image2,
      image3
    );

    if (!response.success) {
      if (response.unauthorized) {
        dispatch(empty_admins());
        dispatch(empty_categories());
        dispatch(empty_orders());
        dispatch(empty_products());
        dispatch(logout());
        navigate("/login");
      }
      toast.error(response.message);
      return;
    }

    setBlur("blur(0px)");
    setDisplay("d-none");
    dispatch(edit_category(response.category));
    toast.warning("Category edited");
    setCategory(null);
  };

  useEffect(() => {
    if (category) {
      setName(category.name);
      setTitle(category.title);
      setTip(category.tip);
      setSubtitle(category.subtitle);
      setIncentive(category.incentive);
      setDescription(category.description);
    }
  }, [category]);

  return (
    category && (
      <div className={`${display} flex-column ${styles.editContainer} p-4`}>
        <div className="d-flex justify-content-between">
          <h4 className={`${styles.title}`}>Create product</h4>
          <p
            onClick={() => {
              setBlur("blur(0px)");
              setDisplay("d-none");
              setCategory(null);
            }}
          >
            <strong>X</strong>
          </p>
        </div>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="container ms-2 me-2"
        >
          <div className="d-flex">
            <div className={`form-group mt-1 ${styles.inputName} me-5`}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                className={`form-control`}
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className={`form-group mt-1 ${styles.inputTitle}`}>
              <label htmlFor="">Title</label>
              <input
                type="text"
                className={`form-control`}
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="d-flex">
            <div className={`form-group mt-1 ${styles.inputTip} me-5`}>
              <label htmlFor="">Tip</label>
              <input
                type="text"
                className={`form-control`}
                name="tip"
                value={tip}
                onChange={(event) => setTip(event.target.value)}
              />
            </div>
            <div className={`form-group mt-1 ${styles.inputSubtitle}`}>
              <label htmlFor="">Subtitle</label>
              <input
                type="text"
                className={`form-control`}
                name="subtitle"
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
              />
            </div>
          </div>
          <div className={`form-group mt-1`}>
            <label htmlFor="">Incentive</label>
            <input
              type="text"
              className={`form-control`}
              name="incentive"
              value={incentive}
              onChange={(event) => setIncentive(event.target.value)}
            />
          </div>
          <div className={`form-group mt-1`}>
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              className={`form-control`}
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          <div className={`form-group mt-1`}>
            <label htmlFor="">Image 1</label>
            <input
              type="file"
              className={`form-control`}
              name="image1"
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  setImage1(event.target.files[0]);
                }
              }}
            />
          </div>
          <div className={`form-group mt-1`}>
            <label htmlFor="">Image 2</label>
            <input
              type="file"
              className={`form-control`}
              name="image2"
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  setImage2(event.target.files[0]);
                }
              }}
            />
          </div>
          <div className={`form-group mt-1`}>
            <label htmlFor="">Image 3</label>
            <input
              type="file"
              className={`form-control`}
              name="image3"
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  setImage3(event.target.files[0]);
                }
              }}
            />
          </div>
          <button type="submit" className="btn btn-success mt-1">
            Edit
          </button>
        </form>
      </div>
    )
  );
}

export default EditCategory;
