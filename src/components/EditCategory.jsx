import axios from "axios";
import { useState } from "react";
import styles from "../modules/EditCategory.module.css"

function EditCategory({ display, setDisplay, setBlur, id }) {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBlur("blur(0px)");
    setDisplay("d-none");
    await axios({
      url: `${process.env.REACT_APP_API_URL}/categories/${id}`,
      method: "PATCH",
      data: { name },
    });
  };

  return (
    <div className={`${display} flex-column ${styles.editContainer} p-4`}>
      <h5>Create product</h5>
      <form
        action=""
        onSubmit={(event) => handleSubmit(event)}
        className="container"
      >
        <div className={`form-group mt-1`}>
          <label htmlFor="">Name</label>
          <input type="text" className={`form-control`} name="name" onChange={(event) => setName(event.target.value)}/>
        </div>
        <button type="submit" className="btn btn-success mt-1">
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditCategory;
