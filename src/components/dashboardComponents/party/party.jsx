import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import partyService from "../../../services/partyService";
//import authService from "../../../services/authService";
import characterService from "../../../services/characterService";
import InviteCharacterModal from "./inviteCharacterModal";
import Table from "../../common/table";

const columns = [
  {
    label: "Name",
    path: "name",
  },
  {
    label: "Vocation",
    path: "vocation",
  },
];

const Character = (props) => {
  const [party, setParty] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: party } = await partyService.getParty(
          props.match.params.id
        );

        party.members = [...party.members, party.partyLeaderId];
        const members = [];
        for await (const m of party.members) {
          const { data: char } = await characterService.getCharacter(m);
          members.push(char);
        }
        party.members = [...members];
        setParty(party);

        /*   const user = authService.getCurrentUser();
        /*  const kickChar = {
          key: "Kick Char",
          label: "",
          content: () => {
            return "Hello";
          },
        };
        /*    if (user._id === party.ownerId) {
          columns.push(kickChar);
        }*/
      } catch (ex) {
        if (ex.response.status === 404) setError("not found");
      }
      setLoading(false);
    };

    fetchData();
  }, [props.match.params.id]);

  if (!loading && error === "not found") return <Redirect to={"/not-found"} />;

  console.log(party._id);
  return (
    <>
      <div>
        {loading && <h3>Loading...</h3>}
        {party._id && !loading && (
          <div>
            <h2>{party.name}</h2>
            <InviteCharacterModal party={party} />
            <Table columns={columns} data={party.members} />
            <Link to={"/dashboard/hunts/" + party._id} className="btn btn-info">
              Check Hunts
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Character;
