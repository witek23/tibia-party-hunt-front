import React from "react";
import Table from "../common/table";
import { Link } from "react-router-dom";

const tableColumns = [
  {
    label: "Party",
    path: "name",
    width: "50%",
  },
  {
    label: "Character",
    path: "character",
    width: "50%",
  },
];

const JoinePartiesTable = ({ parties, characters, user }) => {
  const joinedParties = [];
  characters.forEach((c) => {
    parties.filter((p) => {
      if (p.members.includes(c._id) && p.ownderId !== user._id) {
        p.character = c.name;
        joinedParties.push(p);
      }
    });
  });

  return (
    <div className="card">
      <div className="card-header text-white bg-warning">Joined Parties</div>
      <div className="card-body">
        {joinedParties.length > 0 && (
          <Table columns={tableColumns} data={joinedParties} />
        )}
        {joinedParties.length === 0 && (
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

export default JoinePartiesTable;
