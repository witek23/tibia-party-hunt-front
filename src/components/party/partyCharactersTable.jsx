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
  //  const myInvitations = party.filter();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: invs,
      } = await partyInvitationService.getPartyInivitations();
      const pendingInvs = invs.filter(
        (i) => i.partyId === party._id && i.invStatus === "Pending"
      );
      const myCharacters = allCharacters.filter((c) => c.ownerId === user._id);

      const myInvs = [];
      myCharacters.forEach((m) => {
        pendingInvs.forEach((p) => {
          if (p.invitedCharId === m._id) {
            m.invs = p;
            myInvs.push(m);
          }
        });
      });

      setPartyInvs(myInvs);
    };

    fetchData();
  }, [party]);

  const onAccept = () => {
    console.log("UPDATE ACCEPT");
  };

  console.log(partyInvs);
  return (
    <div className="card">
      <div className="card-header text-white bg-warning">Party Members</div>
      {partyInvs.length > 0 &&
        partyInvs.map((p) => (
          <React.Fragment>
            <div className="alert alert-success" key={p._id}>
              You are invited to {p.name}
            </div>
            <button onClick={onAccept}>Accept</button>
            <button>Decline</button>
          </React.Fragment>
        ))}
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
