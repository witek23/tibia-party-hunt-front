import React, { useState, useEffect } from "react";
import partyService from "../../../services/partyService";
import { Redirect } from "react-router-dom";
import InviteCharacterModal from "./inviteCharacterModal";

const Character = (props) => {
  const [party, setParty] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: party } = await partyService.getParty(
          props.match.params.id
        );

        setParty(party);
      } catch (ex) {
        if (ex.response.status === 404) setError("not found");
      }
      setLoading(false);
    };

    fetchData();
  }, [props.match.params.id]);

  if (!loading && error === "not found") return <Redirect to={"/not-found"} />;

  return (
    <>
      <div className="content-container">
        {loading && <h3>Loading...</h3>}
        {party._id && !loading && (
          <div>
            <h2>{party.name}</h2>
            <div>Some party data</div>
            <InviteCharacterModal party={party} />
          </div>
        )}
      </div>
    </>
  );
};

export default Character;
