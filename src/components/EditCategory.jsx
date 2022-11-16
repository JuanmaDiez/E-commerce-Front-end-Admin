import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../modules/EditCategory.module.css";
import { edit_category } from "../redux/categorySlice";

function EditCategory({ display, setDisplay, setBlur, id }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBlur("blur(0px)");
    setDisplay("d-none");
    dispatch(edit_category({ id, name }));
    await axios({
      url: `${process.env.REACT_APP_API_URL}/categories/${id}`,
      method: "PATCH",
      data: { name },
    });
  };

  return (
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
        action=""
        onSubmit={(event) => handleSubmit(event)}
        className="container"
      >
        <div className={`form-group mt-1`}>
          <label htmlFor="">Name</label>
          <input
            type="text"
            className={`form-control`}
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success mt-1">
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditCategory;
