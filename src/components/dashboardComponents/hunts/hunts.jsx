import React, { useState, useEffect } from "react";
import partyService from "../../../services/partyService";
import characterService from "../../../services/characterService";
import spawnService from "../../../services/spawnService";
import huntService from "../../../services/huntService";
import { Redirect } from "react-router-dom";
import AddHunt from "./addHunt";

const Hunts = (props) => {
  const [party, setParty] = useState([]);
  const [error, setError] = useState([]);
  const [hunts, setHunts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spawns, setSpawns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: party } = await partyService.getParty(
          props.match.params.partyId
        );

        const { data: spawns } = await spawnService.getSpawns();
        setSpawns(spawns);

        const hunts = await huntService.getHuntsByParty(party._id);
        setHunts(hunts);

        party.members = [...party.members, party.partyLeaderId];
        const members = [];
        for await (const m of party.members) {
          const { data: char } = await characterService.getCharacter(m);
          members.push(char);
        }
        party.members = [...members];
        setParty(party);

        setLoading(false);
      } catch (ex) {
        console.log(ex);
        if (ex.response && ex.response.status === 404) setError("not found");
      }
    };

    fetchData();
    setLoading(false);
  }, [props.match.params.partyId]);

  const handleSubmit = async (val) => {
    const { spawnId } = val;
    const { sessionData, characterData } = val.partyHuntData;

    characterData.forEach((d) => {
      party.members.forEach((p) => {
        if (p.name === d.name) {
          d.characterId = p._id;
        }
      });
    });

    const hunt = {
      huntDate: sessionData.dateStart,
      huntDuration: sessionData.duration,
      loot: sessionData.loot,
      supplies: sessionData.supplies,
      balance: sessionData.balance,
      lootType: sessionData.lootType,
      spawnId: spawnId,
      partyId: party._id,
      members: characterData,
      paymentStatus: "Pending",
    };

    try {
      const { data: newHunt } = await huntService.addHunt(hunt);
      const _hunts = [...hunts, newHunt];
      setHunts(_hunts);
    } catch (ex) {
      console.log(ex.response && ex.response);
    }
  };

  const getHuntStatus = (hunt) => {
    const status = hunt.balance > 0 ? "Profit: " : "Waste: ";
    const value =
      hunt.balance > 1000000
        ? (hunt.balance / 1000000).toFixed(2) + "kk"
        : hunt.balance > 1000
        ? (hunt.balance / 1000).toFixed(2) + "k"
        : hunt.balance;

    return status + value;
  };

  if (!loading && error === "not found") return <Redirect to={"/not-found"} />;

  return (
    <>
      <h2>Hunts</h2>
      <AddHunt onSubmit={handleSubmit} party={party} spawns={spawns} />
      {!loading && hunts.length > 0 && (
        <React.Fragment>
          <table className="table">
            <thead>
              <tr>
                <td>ID</td>
                <td>Participants</td>
                <td>Hunt Status</td>
                <td>Payment Status</td>
              </tr>
            </thead>
            <tbody>
              {hunts.length > 0 &&
                hunts.map((h, index) => (
                  <tr key={h._id}>
                    <td key={h._id}>{index + 1}</td>
                    <td key={h._id + "members"}>
                      {h.members
                        .map((m) => m.name)
                        .reduce(function (previousValue, currentValue) {
                          return previousValue + ", " + currentValue;
                        })}
                    </td>
                    <td key={h.id + h.loot}>{getHuntStatus(h)}</td>
                    <td>{h.paymentStatus}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </>
  );
};

export default Hunts;
