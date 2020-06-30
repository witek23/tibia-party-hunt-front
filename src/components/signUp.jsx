import React, { useState } from "react";
import Input from "./common/input";
import Button from "./common/button";
import { NavLink } from "react-router-dom";
import Joi from "joi-browser";
import authService from "../services/authService";
import * as userService from "../services/userService";

const initialValues = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
};

const joiSchema = {
  email: Joi.string()
    .regex(/.+@[a-zA-Z0-9!?-_]+\.[a-zA-Z]+/)
    .required()
    .label("Email")
    .error((errors) => {
      errors.forEach((err) => {
        if (err.type === "string.regex.base")
          err.message = "Wrong email pattern.";
      });
      return errors;
    }),
  name: Joi.string().min(3).max(50).required().label("User Name"),
  password: Joi.string().required().min(5).label("Password"),
  confirmPassword: Joi.string().min(5).required().label("Confirm Password"),
};

const SignUp = () => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const _errors = validate();
    if (_errors) {
      setErrors(_errors);
      return;
    }

    try {
      const res = await userService.register(values);
      console.log(res.headers);
      authService.loginWithJwt(res.headers["auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const { data } = ex.response;
        const key = Object.keys(data)[0];
        const val = data[Object.keys(data)[0]];

        setErrors({ ...errors, [key]: val });
      }
    }
  };

  const validate = () => {
    const { error } = Joi.validate(values, joiSchema, { abortEarly: false });

    const _errors = {};
    if (error) {
      for (let item of error.details) {
        _errors[item.path[0]] = item.message;
      }
    }

    if (values.password !== values.confirmPassword) {
      _errors["confirmPassword"] = "Confirm Password does not match Password.";
    }

    return Object.keys(_errors).length > 0 ? _errors : null;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const { error } = Joi.validate(value, joiSchema[name]);

    e.persist();
    setValues({ ...values, [name]: value });

    if (error) setErrors({ ...errors, [name]: error.details[0].message });
    else delete errors[name];
  };

  return (
    <React.Fragment>
      <div className="container mt-5">
        <h1 className="m-4">Register Yourself</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            title="Provide us Your e-mail address"
            placeholder="Enter e-mail address"
            onChange={onChange}
            error={errors["email"]}
          />
          <Input
            type="text"
            name="name"
            title="How should we call You"
            placeholder="Enter user name"
            onChange={onChange}
            error={errors["name"]}
          />
          <div className="row">
            <div className="col-md-6">
              <Input
                type="password"
                name="password"
                title="Enter your password"
                placeholder="Enter password"
                onChange={onChange}
                error={errors["password"]}
              />
            </div>
            <div className="col-md-6">
              <Input
                type="password"
                name="confirmPassword"
                title="Confirm your password"
                placeholder="Confirm password"
                onChange={onChange}
                error={errors["confirmPassword"]}
              />
            </div>
          </div>

          <div className="mt-3">
            <Button text="Save" type="submit" btnType="btn btn-success" />
            <NavLink className="btn btn-danger ml-2" to="/home">
              Take me out of here
            </NavLink>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
