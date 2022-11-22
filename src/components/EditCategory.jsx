import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styles from "../modules/EditCategory.module.css";
import { edit_category } from "../redux/categorySlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCategory({ display, setDisplay, setBlur, category, setCategory }) {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [title, setTitle] = useState(null);
  const [tip, setTip] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const [incentive, setIncentive] = useState(null);
  const [description, setDescription] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setBlur("blur(0px)");
    setDisplay("d-none");
    dispatch(
      edit_category({
        id: category._id,
        name: name || category.name,
        title: title || category.title,
        subtitle: subtitle || category.subtitle,
        tip: tip || category.tip,
        incentive: incentive || category.incentive,
        description: description || category.description,
      })
    );
    toast.warning("Category edited");
    setCategory(null);
    await axios({
      url: `${process.env.REACT_APP_API_URL}/categories/${category._id}`,
      method: "PATCH",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${admin.token}`,
      },
    });
  };

  return (
    category && (
      <div className={`${display} flex-column ${styles.editContainer} p-4`}>
        <div className="d-flex justify-content-between">
          <h5>Create product</h5>
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
                defaultValue={category.name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className={`form-group mt-1 ${styles.inputTitle}`}>
              <label htmlFor="">Title</label>
              <input
                type="text"
                className={`form-control`}
                name="title"
                defaultValue={category.title}
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
                defaultValue={category.tip}
                onChange={(event) => setTip(event.target.value)}
              />
            </div>
            <div className={`form-group mt-1 ${styles.inputSubtitle}`}>
              <label htmlFor="">Subtitle</label>
              <input
                type="text"
                className={`form-control`}
                name="subtitle"
                defaultValue={category.subtitle}
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
              defaultValue={category.incentive}
              onChange={(event) => setIncentive(event.target.value)}
            />
          </div>
          <div className={`form-group mt-1`}>
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              className={`form-control`}
              name="description"
              defaultValue={category.description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          <div className={`form-group mt-1`}>
            <label htmlFor="">Image 1</label>
            <input type="file" className={`form-control`} name="image1" />
          </div>
          <div className={`form-group mt-1`}>
            <label htmlFor="">Image 2</label>
            <input type="file" className={`form-control`} name="image2" />
          </div>
          <div className={`form-group mt-1`}>
            <label htmlFor="">Image 3</label>
            <input type="file" className={`form-control`} name="image3" />
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
