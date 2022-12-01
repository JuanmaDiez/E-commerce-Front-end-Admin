import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add_category } from "../redux/categorySlice";
import styles from "../modules/CreateCategory.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateCategory({ display, setDisplay, setBlur }) {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setDisplay("d-none");
    setBlur("blur(0px)");
    toast.success("Category created!")
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/categories`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${admin.token}`,
      },
    });
    dispatch(add_category(response.data));
  };

  return (
    <div className={`${display} flex-column ${styles.createContainer}`}>
      <div className="d-flex justify-content-between m-3">
        <h4 className={`${styles.title}`}>New category</h4>
        <p
          onClick={() => {
            setDisplay("d-none");
            setBlur("blur(0px)");
          }}
        >
          <strong>X</strong>
        </p>
      </div>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="container me-2 ms-2"
      >
        <div className="d-flex ">
          <div className={`form-group mt-1 ${styles.inputName} me-5`}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              className={`form-control`}
              name="name"
              required
            />
          </div>
          <div className={`form-group ${styles.inputTitle} mt-1`}>
            <label htmlFor="">Title</label>
            <input
              type="text"
              className={`form-control`}
              name="title"
              required
            />
          </div>
        </div>
        <div className="d-flex">
          <div className={`form-group mt-1 me-5 ${styles.inputTip}`}>
            <label htmlFor="">Tip</label>
            <input type="text" className={`form-control`} name="tip" />
          </div>
          <div className={`form-group mt-1 ${styles.inputSubtitle}`}>
            <label htmlFor="">Subtitle</label>
            <input
              type="text"
              className={`form-control`}
              name="subtitle"
              required
            />
          </div>
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
  );
}

export default CreateCategory;
