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
        console.log(ex.response);
        if (ex.response && ex.response.status === 404) setError("not found");
      }
      setLoading(false);
    };

    fetchData();
  }, [props.match.params.id]);

  const setTeamHuntingData = (hunts) => {
    const data = {
      total: {
        balance: 0,
        loot: 0,
        supplies: 0,
        hunts: hunts.length,
      },
      pending: {
        balance: 0,
        loot: 0,
        supplies: 0,
        hunts: 0,
      },
    };

    hunts.forEach((h) => {
      data.total.balance += h.balance;
      data.total.loot += h.loot;
      data.total.supplies += h.supplies;

      if (h.paymentStatus === "Pending") {
        data.pending.balance += h.balance;
        data.pending.loot += h.balance;
        data.pending.supplies += h.supplies;
        data.pending.hunts += 1;
      }
    });

    setHuntingData(data);
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
            {huntingData.total.hunts > 0 && (
              <>
                <div>
                  Total Hunts Stats
                  <ul>
                    <li>{huntingData.total.balance}</li>
                    <li>{huntingData.total.supplies}</li>
                    <li>{huntingData.total.loot}</li>
                  </ul>
                </div>
                <div>
                  {huntingData.pending.hunts === 0 && (
                    <div>There are no pending hunts.</div>
                  )}
                  {huntingData.pending.hunts > 0 && (
                    <div>
                      Pending payouts for hunts
                      <ul>
                        <li>{huntingData.pending.balance}</li>
                        <li>{huntingData.pending.supplies}</li>
                        <li>{huntingData.pending.loot}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
            {huntingData.total.hunts === 0 && (
              <div>There are no recoreded hunts yet.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Character;
