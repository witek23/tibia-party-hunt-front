import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import InvitationButton from "./invitationButton";
import partyInvitationService from "../../services/partyInvitationService";

const InviteCharacterModal = ({ party, allCharacters, user, partyInvs }) => {
  const [invitableChars, setInvitableChars] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const partyWorld = party.members.filter((m) => m.isLeader)[0].world;
      const charsFromWorld = allCharacters.filter(
        (c) => c.world === partyWorld
      );

      const notMembers = [];
      charsFromWorld.forEach((c) => {
        let found = false;
        party.members.forEach((m) => {
          if (c._id === m._id) found = true;
        });

        if (!found) {
          c.invitation = {};
          notMembers.push(c);
        }
      });

      notMembers.forEach((nm) => {
        partyInvs.forEach((p) => {
          if (nm._id === p.invitedCharId) nm.invitation = p;
        });
      });

      setInvitableChars(notMembers);
    };

    fetchData();
  }, [partyInvs, allCharacters, party]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async (char) => {
    if (!char.invitation.invStatus) {
      const partyInvitation = {
        invOwner: user._id,
        partyId: party._id,
        invStatus: "Pending",
        invitedCharId: char._id,
      };

      try {
        const {
          data: inv,
        } = await partyInvitationService.createPartyInvitation(partyInvitation);
        const invChars = [...invitableChars];
        invChars.forEach((c) => {
          if (c._id === char._id) c.invitation = inv;
        });
        setInvitableChars(invChars);
      } catch (ex) {
        console.log(ex.response);
      }
    } else {
      const status = char.invitation.invStatus;
      let invStatus;
      if (status === "Pending") invStatus = "Canceled";
      else if (status === "Accepted") invStatus = "Canceled";
      else if (status === "Declined") invStatus = "Pending";
      else if (status === "Canceled") invStatus = "Pending";

      try {
        const { data: inv } = await partyInvitationService.updateStatus(
          char.invitation._id,
          invStatus
        );
        const invChars = [...invitableChars];
        invChars.forEach((c) => {
          if (c._id === char._id) c.invitation = inv;
        });
        setInvitableChars(invChars);
      } catch (ex) {
        console.log(ex.response);
      }
    }
  };

  return (
    <>
      <div className="row d-block mx-1">
        <Button variant="info" onClick={handleShow} block className="mt-1 mb-2">
          Invite Character
        </Button>

        <Modal
          show={show}
          size="xl"
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered={true}
        >
          <Modal.Header closeButton className="bg-warning">
            <Modal.Title>Invite Character</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {invitableChars.length > 0 && (
              <table className="table">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>Chracter Name</td>
                    <td>Profession</td>
                    <td>Invitation Status</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {invitableChars.map((c) => (
                    <tr key={c._id}>
                      <td key={c.name}>{c.name}</td>
                      <td key={c.vocation}>{c.vocation}</td>
                      <td key={c.name + " invitation"}>
                        {c.invitation.invStatus || ""}
                      </td>
                      <td>
                        <InvitationButton
                          character={c}
                          onClick={() => handleClick(c)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default InviteCharacterModal;
