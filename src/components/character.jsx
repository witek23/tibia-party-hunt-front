import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as partyInvitationsService from "../services/partyInvitationService";

const Character = () => {
  const { character: char } = useHistory().location.state;
  const [character, setCharacter] = useState(char || {});

  useEffect(() => {
    const fetchData = async () => {
      const partyInvs = await partyInvitationsService.getPartyInivitations();
      console.log(partyInvs);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>{character.name}</h1>
    </div>
  );
};

export default Character;
