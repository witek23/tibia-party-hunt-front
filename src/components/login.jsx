import React from "react";
import Input from "./common/input";
import Button from "./common/button";

const Login = () => {
  return (
    <div className="container">
      <form>
        <Input
          name="email"
          type="email"
          title="Email Address"
          placeholder="Enter email address..."
        />

        <Input
          name="password"
          type="password"
          title="Password"
          placeholder="Enter password"
        />

        <Button text="Submit" btnType="btn btn-success" />
      </form>
    </div>
  );
};

export default Login;
