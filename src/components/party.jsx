import React, { useState, useEffect } from "react";
import partyService from "../services/partyService";
import { useHistory } from "react-router-dom";

const Party = () => {
  const [party, setParty] = useState({});
  const data = useHistory().location;

  const getPartyNamyFromUrl = (location) => {
    const re = new RegExp("/my-account/party/([a-zA-Z0-9_]+)/?");
    const matches = re.exec(location.pathname);

    return matches[1];
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!data.state) {
        const pt = await partyService.getParties();
        const name = getPartyNamyFromUrl(data).replace("_", " ");
        const _party = pt.data.filter((p) => p.name === name);
        setParty(_party[0]);
      }
    };
    fetchData();
  }, [data]);
  return <h1>{party.name}</h1>;
};

export default Party;
