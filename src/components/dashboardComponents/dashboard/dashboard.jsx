import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import partyInvsService from "../../../services/partyInvitationService";
import authService from "../../../services/authService";
import characterService from "../../../services/characterService";

import "./dashboard.css";

const Dashboard = () => {
  const [partyInvs, setPartyInvs] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = authService.getCurrentUser();
      const { data: characters } = await characterService.getCharacters();
      const myChars = characters.filter((c) => c.ownerId === user._id);
      const { data: invs } = await partyInvsService.getPartyInivitations();
      const pendingInvs = invs.filter((i) => i.invStatus === "Pending");

      const isCharInvited = pendingInvs.some(({ invitedCharId }) =>
        myChars.some((c) => c._id === invitedCharId)
      );

      setPartyInvs(isCharInvited);
    };

    fetchData();
  }, [partyInvs]);

  return (
    <>
      <h2>Dashboard</h2>
      <div className="container-liquid">
        <div className="row">
          <Card className="box-shadow mr-3" style={{ width: "auto" }}>
            <Card.Body>
              <Card.Title>Party Invitations</Card.Title>
              <Card.Text>
                {partyInvs && (
                  <span>
                    You've got some new invitations. Check them out{" "}
                    <Link
                      className="text-decoration-none"
                      to={"/dashboard/invitations"}
                    >
                      <strong>here</strong>
                    </Link>
                  </span>
                )}
                {!partyInvs && (
                  <span>There are no new invitations for now.</span>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="box-shadow mr-3">
            <Card.Body>
              <Card.Title>Characters</Card.Title>
              <Card.Text>
                Manage your characters{" "}
                <Link
                  className="text-decoration-none"
                  to={"/dashboard/characters"}
                >
                  <strong>here</strong>
                </Link>
                .
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
