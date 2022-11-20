import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../modules/EditCategory.module.css";
import { edit_category } from "../redux/categorySlice";

function EditCategory({ display, setDisplay, setBlur, category }) {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setBlur("blur(0px)");
    setDisplay("d-none");
    dispatch(edit_category({ id: category._id, ...event.target }));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/categories/${category._id}`,
      method: "PATCH",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
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
              />
            </div>
            <div className={`form-group mt-1 ${styles.inputTitle}`}>
              <label htmlFor="">Title</label>
              <input
                type="text"
                className={`form-control`}
                name="title"
                defaultValue={category.title}
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
              />
            </div>
            <div className={`form-group mt-1 ${styles.inputSubtitle}`}>
              <label htmlFor="">Subtitle</label>
              <input
                type="text"
                className={`form-control`}
                name="subtitle"
                defaultValue={category.subtitle}
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
            />
          </div>
          <div className={`form-group mt-1`}>
            <label htmlFor="">Description</label>
            <textarea
              type="text"
              className={`form-control`}
              name="description"
              defaultValue={category.description}
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
