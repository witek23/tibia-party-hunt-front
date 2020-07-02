import React from "react";

const Select = ({ name, title, error, options, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor="name">{title}</label>
      <select name={name} className="form-control" {...rest} id="name">
        <option value="" hidden>
          Select vocation
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger mt-1">{error}</div>}
    </div>
  );
};

export default Select;
