import React from "react";
import Table from "../common/table";
import { Link } from "react-router-dom";

const tableColumns = [
  {
    label: "Character",
    path: "name",
    width: "44%",
    content: (party) => (
      <Link
        to={{
          pathname: "/my-account/party/" + party.name.replace(" ", "_"),
          state: party,
        }}
      >
        {party.name}
      </Link>
    ),
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

const MyPartiesTable = ({ parties }) => {
  return (
    <div className="card">
      <div className="card-header text-white bg-warning">My Parties</div>
      <div className="card-body">
        <Link
          className="btn btn-sm btn-danger d-block mb-2"
          to="/my-account/create-party"
        >
          Create Party
        </Link>
        {parties.length > 0 && <Table columns={tableColumns} data={parties} />}
        {parties.length === 0 && (
          <div className="alert alert-warning">
            <strong>Holy guacamole!</strong> You don't own ant party yet. Click{" "}
            <Link to="/my-account/create-party" className="alert-link">
              here
            </Link>{" "}
            to create party
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPartiesTable;
