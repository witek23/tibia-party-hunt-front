import React, { useState } from "react";
import { useEffect } from "react";
import partyService from "../../../services/partyService";

const Hunts = (props) => {
  const [party, setParty] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: party } = await partyService.getParty(
        props.match.params.partyId
      );

      console.log(party);
    };

    fetchData();
  });
  return <h1>hunts</h1>;
};

export default Hunts;
