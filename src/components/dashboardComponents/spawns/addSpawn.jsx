import React, { useState } from "react";
import spawnService from "../../../services/spawnService";
import Input from "../../common/input";
import Button from "../../common/button";
import { Link } from "react-router-dom";
import Joi from "joi-browser";

const joiSchema = {
  name: Joi.string().required().min(3).max(30).label("Spawn Name"),
  level: Joi.number().min(1).max(2000).required(),
};

const AddSpawn = () => {
  const [spawn, setSpawn] = useState({});
  const [errors, setErrors] = useState([]);

  const onChange = (e) => {
    const { name, value } = e.target;
    const { error } = Joi.validate(value, joiSchema[name]);

    e.persist();
    setSpawn({ ...spawn, [name]: value });

    if (error) setErrors({ ...errors, [name]: error.details[0].message });
    else delete errors[name];
  };

  const validate = () => {
    const { error } = Joi.validate(spawn, joiSchema, { abortEarly: false });

    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const errors = validate();
    if (errors) {
      setErrors(errors);
      return;
    }

    try {
      console.log("lol");
      await spawnService.addSpawn(spawn);
      alert("spawn Added");
    } catch (ex) {
      console.log(ex.response);
      if (ex.response && ex.response.status === 400) {
        const { data } = ex.response;
        const key = Object.keys(data)[0];
        const val = data[Object.keys(data)[0]];
        setErrors({ ...errors, [key]: val });
      }
    }
  };
  return (
    <div className="container">
      <h1>Create Spawn</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          title="Spawn Name"
          placeholder="Enter spawn name"
          onChange={onChange}
          error={errors["name"]}
        />

        <Input
          name="level"
          type="number"
          title="Spawn Level"
          placeholder="Enter level"
          onChange={onChange}
          error={errors["level"]}
        />

        <Button text="Submit" type="submit" btnType="btn btn-success" />
        <Link className="btn btn-danger ml-2" to="/dashboard">
          Back to Parties
        </Link>
      </form>
    </div>
  );
};

export default AddSpawn;
