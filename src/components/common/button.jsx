import React from "react";

const Button = ({ text, type, btnType }) => {
  const color = (btnType && btnType) || "btn btn-primary";
  return (
    <button type={type} className={color}>
      {text}
    </button>
  );
};

export default Button;
