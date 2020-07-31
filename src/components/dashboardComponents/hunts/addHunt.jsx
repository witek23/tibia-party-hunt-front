import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getDataFromRegex, errorMessage } from "../../../utils/characterRegex";
import Input from "../../common/input";
import Select from "../../common/select";

const AddHunt = ({ onSubmit, party, spawns }) => {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const { spawnId, partyHuntData } = data;

    const _errors = {};
    if (!spawnId) _errors["spawnId"] = "You have to provide a spawn.";

    if (!partyHuntData)
      _errors["partyHuntData"] =
        "You have to provide data from party hunt analyzer.";

    return Object.keys(_errors).length === 0 ? null : _errors;
  };

  const areNotPartyMembers = (regexData, ptMembers) => {
    const ptMembersNames = ptMembers.map((p) => {
      return p.name;
    });

    for (let char of regexData) {
      if (!ptMembersNames.includes(char.name))
        return `Character ${char.name} is not member of this party.`;
    }

    return null;
  };

  const handleClick = (e) => {
    e.preventDefault();
    const _errors = validate();

    if (_errors) {
      setErrors(_errors);
      return;
    }

    onSubmit(data);
    clearChanges();
    setShow(false);
  };

  const clearChanges = () => {
    setData([]);
    setErrors([]);
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "partyHuntData") {
      const regexData = getDataFromRegex(value);
      if (regexData === errorMessage) {
        setErrors({ ...errors, [name]: errorMessage });
        return;
      }

      const areNotMembers = areNotPartyMembers(
        regexData.characterData,
        party.members
      );
      if (areNotMembers) {
        setErrors({ ...errors, [name]: areNotMembers });
        return;
      }

      setData({ ...data, [name]: regexData });
      delete errors[name];
    }

    if (name === "spawnId") {
      if (!value) {
        setErrors({ ...errors, [name]: "You have to provide a spawn." });
        return;
      }

      setData({ ...data, [name]: value });
      delete errors[name];
    }
  };

  const handleClose = () => {
    setShow(false);
    clearChanges();
  };
  const handleShow = () => setShow(true);

  return (
    <div className="row d-block mx-1">
      <Button variant="info" onClick={handleShow} block className="mt-1 mb-2">
        Add Hunt
      </Button>

      <Modal
        show={show}
        size="xl"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title>Add Hunt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            name="partyHuntData"
            title="Party Hunt Data"
            type="text"
            onChange={onChange}
            error={errors["partyHuntData"]}
            placeholder="Paste data from hunt..."
          />

          <Select
            name="spawnId"
            title="Chose Spawn"
            options={spawns}
            error={errors["spawnId"]}
            onChange={onChange}
          />

          <button className="btn btn-info" onClick={handleClick}>
            Submit Data
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddHunt;
