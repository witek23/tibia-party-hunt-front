import React from "react";

const Input = ({ name, title, type, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{title}</label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        {...rest}
      />
      {error && <div className="alert alert-danger mt-1">{error}</div>}
    </div>
  );
};

export default Input;
