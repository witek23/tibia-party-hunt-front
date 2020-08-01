import React, { useState, useEffect } from "react";
import authService from "../../../services/authService";
import partyService from "../../../services/partyService";
import huntService from "../../../services/huntService";
import Select from "../../common/select";
import Check from "../../common/check";

const Payout = () => {
  const [parties, setParties] = useState([]);
  const [hunts, setHunts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = authService.getCurrentUser();
      const parties = await partyService.getPartyByUser(user._id);

      setParties(parties);
    };

    fetchData();
  }, []);

  const changeParty = async (e) => {
    const { value } = e.target;
    const party = parties.filter((p) => p._id === value)[0];
    const partyHunts = await huntService.getHuntsByParty(party._id);
    partyHunts.forEach((p) => {
      p.includeInPayout = true;
    });

    setHunts(partyHunts);
  };

  const setIncludeHunt = (hunt) => {
    console.log("LUUUUL");
    const huntsCopy = hunts;
    huntsCopy.forEach((h) => {
      if (h._id === hunt._id) h.includeInPayout = !h.includeInPayout;
    });

    setHunts(huntsCopy);
  };

  console.log(hunts);
  return (
    <div>
      <h2>Payout Time</h2>

      {parties.length > 0 && (
        <>
          <Select
            name="party"
            title="Chose party"
            options={parties}
            onChange={changeParty}
          />
          {hunts.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Balance</td>
                  <td>Supplies</td>
                  <td>Loot</td>
                  <td>Include</td>
                </tr>
              </thead>
              <tbody>
                {hunts.map((h, index) => (
                  <tr key={h._id}>
                    <td key={index}>{index + 1}</td>
                    <td key={h.balance}>{h.balance}</td>
                    <td key={h.supplies}>{h.supplies}</td>
                    <td key={h.loot}>{h.loot}</td>
                    <td key={index + "check"}>
                      <Check
                        option={h.includeInPayout}
                        onClick={() => setIncludeHunt(h)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default Payout;
