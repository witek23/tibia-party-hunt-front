import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Input from "../../common/input";
import Button from "../../common/button";
import Select from "../../common/select";
import authService from "../../../services/authService";
import characterService from "../../../services/characterService";
import partyService from "../../../services/partyService";
import { Link, useHistory } from "react-router-dom";

const initialValues = {
  name: "",
  ownerId: "",
  partyLeaderId: "",
  members: [],
  hunts: [],
};

const joiSchema = {
  name: Joi.string().required().min(5).max(30).label("Party name"),
  members: Joi.array().required(),
  partyLeaderId: Joi.string().required(),
  ownerId: Joi.string().required(),
  hunts: Joi.array().required(),
};

const AddParty = () => {
  const [party, setParty] = useState(initialValues || {});
  const [myCharacters, setMyCharacters] = useState([]);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const _user = authService.getCurrentUser();
      setUser(_user);

      const { data: chars } = await characterService.getCharacters();
      const myChars = chars.filter((c) => c.ownerId === _user._id);
      setMyCharacters(myChars);
    };

    fetchData();
  }, [party]);

  const onChange = (e) => {
    const { name, value } = e.target;
    const { error } = Joi.validate(value, joiSchema[name]);

    e.persist();
    setParty({ ...party, [name]: value });

    if (error) setErrors({ ...errors, [name]: error.details[0].message });
    else delete errors[name];
  };

  const validate = () => {
    const { error } = Joi.validate(party, joiSchema, { abortEarly: false });

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
      const { data: pt } = await partyService.createParty(party);
      history.push("/dashboard/parties/" + pt._id);
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

  if (!party.ownerId) party.ownerId = user._id;

  return (
    <div className="container">
      <h1>Create Your Party</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          title="Party's Name"
          placeholder="Enter party name"
          onChange={onChange}
          error={errors["name"]}
        />

        <Select
          name="partyLeaderId"
          title="Choose party leader"
          onChange={onChange}
          options={myCharacters}
          error={errors["partyLeaderId"]}
        />

        <Button text="Submit" type="submit" btnType="btn btn-success" />
        <Link className="btn btn-danger ml-2" to="/dashboard/parties">
          Back to Parties
        </Link>
      </form>
    </div>
  );
};

export default AddParty;
