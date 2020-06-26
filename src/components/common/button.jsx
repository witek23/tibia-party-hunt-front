import React from "react";

const Button = ({ text, btnType }) => {
  const color = (btnType && btnType) || "btn btn-primary";
  return (
    <button type="submit" class={color}>
      {text}
    </button>
  );
};

export default Button;
