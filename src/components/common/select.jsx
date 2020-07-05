import React from "react";

const Select = ({ name, title, error, options, ...rest }) => {
  const renderOption = (option) => {
    return (
      <option
        key={typeof option === "string" ? option : option._id}
        value={typeof option === "string" ? option : option._id}
      >
        {typeof option === "string" ? option : option.name}
      </option>
    );
  };
  return (
    <div className="form-group">
      <label htmlFor="name">{title}</label>
      <select name={name} className="form-control" {...rest} id="name">
        <option value="" hidden>
          {title}
        </option>
        {options.map((option) => renderOption(option))}
      </select>
      {error && <div className="alert alert-danger mt-1">{error}</div>}
    </div>
  );
};

export default Select;
