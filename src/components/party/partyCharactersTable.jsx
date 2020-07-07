import React from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import InviteCharacterModal from "./inviteCharacterModal";

const tableColumns = [
  {
    label: "Character",
    path: "name",
    content: (character) => (
      <Link
        to={{
          pathname: `/my-account/characters/${character.name.replace(
            " ",
            "_"
          )}`,
          state: {
            character: character,
          },
        }}
      >
        {character.name}
      </Link>
    ),
  },
  {
    label: "Position",
    path: "isLeader",
    content: (member) => (member.isLeader ? "Leader" : "Member"),
  },
];

const PartyCharactersTable = ({ members, allCharacters }) => {
  return (
    <div className="card">
      <div className="card-header text-white bg-warning">Party Members</div>
      <div className="card-body">
        <InviteCharacterModal members={members} allCharacters={allCharacters} />
        <Table columns={tableColumns} data={members} />
      </div>
    </div>
  );
};

export default PartyCharactersTable;
