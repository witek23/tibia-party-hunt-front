import React from "react";

const Input = ({ name, title, type, ...rest }) => {
  return (
    <div class="form-group">
      <label for={name}>{title}</label>
      <input type={type} class="form-control" id={name} {...rest} />
    </div>
  );
};

export default Input;
