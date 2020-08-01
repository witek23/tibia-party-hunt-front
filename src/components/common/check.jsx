import React from "react";

const Check = ({ option, ...rest }) => {
  return (
    <div className="form-group" {...rest}>
      {option && <i className="fa fa-check" style={{ color: "green" }}></i>}
      {!option && <i className="fa fa-times" style={{ color: "red" }}></i>}
    </div>
  );
};

export default Check;
