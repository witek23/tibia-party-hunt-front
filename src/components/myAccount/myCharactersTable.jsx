import React from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";

const tableColumns = [
  {
    label: "Character",
    path: "name",
    width: "44%",
  },
  {
    label: "World",
    path: "world",
    width: "28%",
  },
  {
    label: "Vocation",
    path: "vocation",
    width: "28%",
  },
];

const MyCharactersTable = ({ characters }) => {
  return (
    <div className="card">
      <div className="card-header text-white bg-warning">My Characters</div>
      <div className="card-body">
        <Link
          className="btn btn-sm btn-danger d-block mb-2"
          to="/my-account/add-character"
        >
          Add Character
        </Link>
        {characters.length > 0 && (
          <Table columns={tableColumns} data={characters} />
        )}
        {characters.length === 0 && (
          <div className="alert alert-warning">
            <strong>Holy guacamole!</strong> You didn't add any characters yet.
            Click{" "}
            <Link to="/my-account/add-character" className="alert-link">
              here
            </Link>{" "}
            to add one.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCharactersTable;
