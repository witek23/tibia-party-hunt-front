import React, { useState, useEffect } from "react";
import partyService from "../services/partyService";
import { useHistory } from "react-router-dom";
import characterService from "../services/characterService";
import PartyCharactersTable from "./party/partyCharactersTable";

const Party = () => {
  const [party, setParty] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const data = useHistory().location;

  const getPartyNamyFromUrl = (location) => {
    const re = new RegExp("/my-account/party/([a-zA-Z0-9_]+)/?");
    const matches = re.exec(location.pathname);

    return matches[1];
  };

  useEffect(() => {
    const fetchData = async () => {
      let _party = data.state && data.state;
      if (!_party) {
        const pt = await partyService.getParties();
        const name = getPartyNamyFromUrl(data).replace("_", " ");
        _party = pt.data.filter((p) => p.name === name)[0];
      }

      const { data: characters } = await characterService.getCharacters();
      setAllCharacters(characters);
      const leaderData = characters.filter(
        (l) => l._id === _party.partyLeaderId
      )[0];
      leaderData.isLeader = true;

      _party.members.forEach((ptMember) => {
        ptMember = characters.filter((char) => char._id === ptMember._id)[0];
      });
      _party.members = [..._party.members, leaderData];

      setParty(_party);
    };

    fetchData();
  }, [data]);

  return (
    <div className="container">
      {!party._id && <div>Content is loading...</div>}
      {party._id && (
        <React.Fragment>
          <div className="row">
            <h2>{party.name}</h2>
          </div>
          <div className="row d-block">
            <PartyCharactersTable party={party} allCharacters={allCharacters} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Party;
