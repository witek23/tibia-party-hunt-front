import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import partyService from "../../../services/partyService";
//import authService from "../../../services/authService";
import huntService from "../../../services/huntService";
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
  const [hunts, setHunts] = useState([]);
  const [huntingData, setHuntingData] = useState({});
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

        const hunts = await huntService.getHuntsByParty(party._id);
        setHunts(hunts);

        setTeamHuntingData(hunts);
      } catch (ex) {
        if (ex.response.status === 404) setError("not found");
      }
      setLoading(false);
    };

    fetchData();
  }, [props.match.params.id]);

  const setTeamHuntingData = (data) => {
    const stats = {
      balance: 0,
      loot: 0,
      supplies: 0,
      hunts: data.count,
    };

    data.forEach((d) => {
      stats.balance += d.balance;
      stats.loot += d.loot;
      stats.supplies += d.supplies;
    });

    setHuntingData(stats);
  };

  if (!loading && error === "not found") return <Redirect to={"/not-found"} />;

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
            {hunts.length > 0 && (
              <>
                <ul>
                  <li>{huntingData.balance}</li>
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Character;
