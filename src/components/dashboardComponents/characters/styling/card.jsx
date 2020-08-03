import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, width, text, link, ...rest }) => {
  const style = text === "+" ? { fontSize: "38px" } : { fontSize: "24px" };
  return (
    <div
      className="card box-shadow m-3"
      style={{ width: width || "20rem" }}
      {...rest}
    >
      <div className="card-body">
        {title && <h4 className="card-title text-center my-3">{title}</h4>}
        <div className="text-center">
          <Link
            className="text-muted text-decoration-none"
            style={style}
            to={link}
          >
            {text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
