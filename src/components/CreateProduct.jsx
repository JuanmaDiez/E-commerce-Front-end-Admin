import { useState, useEffect } from "react";

function CreateProduct({ display, setDisplay }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setDisplay("d-none");
  };
  return (
    <div className={`${display}`}>
      <form action="" onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-success">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
