import React, { useState } from "react";
import Input from "./common/input";
import Button from "./common/button";
import auth from "../services/authService";
import Joi from "joi-browser";

const initialValues = {
  email: "",
  password: "",
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
  password: Joi.string().required().min(5).label("Password"),
};

const Login = () => {
  const [user, setUser] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    const { error } = Joi.validate(value, joiSchema[name]);

    e.persist();
    setUser({ ...user, [name]: value });

    if (error) setErrors({ ...errors, [name]: error.details[0].message });
    else delete errors[name];
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      await auth.login(user.email, user.password);
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

  if (auth.getCurrentUser()) window.location = "/";

  return (
    <div className="container my-5">
      <h1 className="my-3">Log In</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          title="Email Address"
          placeholder="Enter email address"
          onChange={onChange}
          error={errors["email"]}
        />

        <Input
          name="password"
          type="password"
          title="Password"
          placeholder="Enter password"
          onChange={onChange}
          error={errors["password"]}
        />

        <Button text="Submit" type="submit" btnType="btn btn-success" />
      </form>
    </div>
  );
};

export default Login;
