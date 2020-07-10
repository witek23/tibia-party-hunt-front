import React, { useEffect, useState } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import * as partyInvitationsService from "../services/partyInvitationService";
import partyService from "../services/partyService";
import userService from "../services/userService";

const Character = () => {
  const history = useHistory();
  const [character, setCharacter] = useState(
    history.location.state ? history.location.state.character : {}
  );
  const [partyInvs, setPartyInvs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: partyInvs,
      } = await partyInvitationsService.getPartyInivitations();
      const invs = partyInvs.filter((pi) => pi.invitedCharId === character._id);

      if (invs.length > 0) {
        await Promise.all(
          invs.map(async (i) => {
            const { data: getParty } = await partyService.getParty(i.partyId);
            const { data: user } = await userService.getUser(i.invOwner);

            i.partyId = getParty;
            i.invOwner = user;
          })
        );
      }
      setPartyInvs(invs);
    };

    fetchData();
  }, [character]);

  return (
    <>
      {!history.location.state && <Redirect to={"/my-account"} />}
      <div className="container">
        <div className="row">
          <h1>{character.name}</h1>
        </div>
        <div className="row d-block">
          {partyInvs.length > 0 && (
            <ul className="list-unstyled">
              {partyInvs.map((p) => (
                <li key={p._id} className="alert alert-invite">
                  You have recived invitation to{" "}
                  <strong>{p.partyId.name}</strong> from {p.invOwner.name}.
                  Check it out{" "}
                  <Link
                    className="text-decoration-none alert-invite-text"
                    to={"/my-account/party/" + p.partyId.name.replace(" ", "_")}
                  >
                    <strong>here</strong>
                  </Link>
                  .
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Character;
