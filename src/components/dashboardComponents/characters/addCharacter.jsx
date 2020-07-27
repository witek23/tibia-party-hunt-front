import React, { useState } from "react";
import Input from "../../common/input";
import Button from "../../common/button";
import Select from "../../common/select";
import Joi from "joi-browser";
import { NavLink, useHistory } from "react-router-dom";
import characterService from "../../../services/characterService";
import authService from "../../../services/authService";

const { _id: userId } = authService.getCurrentUser();
const initValues = {
  name: "",
  vocation: "",
  world: "",
  ownerId: userId,
};

const joiSchema = {
  name: Joi.string().min(3).max(30).required().label("Character Name"),
  world: Joi.string().required().min(3).max(15).label("World"),
  vocation: Joi.string().required().label("Vocation"),
  ownerId: Joi.string().required(),
};

const vocations = ["Knight", "Druid", "Paladin", "Sorcerer"];

const AddCharacter = () => {
  const [character, setCharacter] = useState(initValues || {});
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const validate = () => {
    const { error } = Joi.validate(character, joiSchema, { abortEarly: false });

    if (!error) return null;
    const _errors = {};

    for (let item of error.details) {
      _errors[item.path[0]] = item.message;
    }

    return _errors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const _errors = validate();
    if (_errors) {
      setErrors(_errors);
      return;
    }

    try {
      await characterService.addCharacter(character);
      history.push("/dashboard/characters");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const { data } = ex.response;
        const key = Object.keys(data)[0];
        const val = data[Object.keys(data)[0]];

        setErrors({ ...errors, [key]: val });
      }
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const { error } = Joi.validate(value, joiSchema[name]);

    e.persist();
    setCharacter({ ...character, [name]: value });

    if (error) setErrors({ ...errors, [name]: error.details[0].message });
    else delete errors[name];
  };

  return (
    <div className="container">
      <h1>Add Character</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          title="Provide us character name"
          placeholder="Enter character name"
          onChange={onChange}
          error={errors["name"]}
        />
        <Select
          name="vocation"
          title="Choose vocation"
          onChange={onChange}
          options={vocations}
          error={errors["vocation"]}
        />
        <Input
          type="text"
          name="world"
          title="On what world are you playing"
          placeholder="Enter world name"
          onChange={onChange}
          error={errors["world"]}
        />
        <div className="mt-3">
          <Button text="Save" type="submit" btnType="btn btn-success" />
          <NavLink className="btn btn-danger ml-2" to="/dashboard/characters">
            Back to Characters
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default AddCharacter;
