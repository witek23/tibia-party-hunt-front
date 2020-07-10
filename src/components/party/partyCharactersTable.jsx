import React, { useEffect, useState } from "react";
import Table from "../common/table";
import InviteCharacterModal from "./inviteCharacterModal";
import auth from "../../services/authService";
import partyInvitationService from "../../services/partyInvitationService";

const tableColumns = [
  {
    label: "Character",
    path: "name",
    /*    content: (character) => (
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
    ),*/
  },
  {
    label: "Position",
    path: "isLeader",
    content: (member) => (member.isLeader ? "Leader" : "Member"),
  },
];

const PartyCharactersTable = ({ party, allCharacters }) => {
  const [partyInvs, setPartyInvs] = useState([]);
  const user = auth.getCurrentUser();
  const myCharacters = allCharacters.filter((c) => c.ownerId === user._id);
  //  const myInvitations = party.filter();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: invs,
      } = await partyInvitationService.getPartyInivitations();
      const partyInvs = invs.filter((i) => i.partyId === party._id);

      setPartyInvs(partyInvs);
    };
  }, []);

  return (
    <div className="card">
      <div className="card-header text-white bg-warning">Party Members</div>
      <div className="card-body">
        {user._id === party.ownerId && (
          <InviteCharacterModal
            party={party}
            allCharacters={allCharacters}
            partyInvs={partyInvs}
            user={user}
          />
        )}
        <Table columns={tableColumns} data={party.members} />
      </div>
    </div>
  );
};

export default PartyCharactersTable;
