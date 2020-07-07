import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Table from "../common/table";
import partyInvitationService from "../../services/partyInvitationService";

const columns = [
  {
    label: "Character Name",
    path: "name",
    width: "40%",
  },
  {
    label: "Vocation",
    path: "vocation",
    width: "30%",
  },
  {
    label: "Status",
    path: "invitation",
    width: "30%",
  },
];

const InviteCharacterModal = ({ members, allCharacters }) => {
  const [show, setShow] = useState(false);

  const partyWorld = members.filter((m) => m.isLeader)[0].world;
  const charsFromWorld = allCharacters.filter((c) => c.world === partyWorld);

  const notMembers = [];
  charsFromWorld.forEach((c) => {
    let found = false;
    members.forEach((m) => {
      if (c._id === m._id) found = true;
    });

    if (!found) notMembers.push(c);
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" onClick={handleShow}>
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
        <Modal.Header closeButton>
          <Modal.Title>Invite Character</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table columns={columns} data={notMembers} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InviteCharacterModal;
