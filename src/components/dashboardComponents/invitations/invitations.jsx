import React, { useState, useEffect } from "react";

import invitationService from "../../../services/partyInvitationService";
import authService from "../../../services/authService";
import partyService from "../../../services/partyService";
import characterService from "../../../services/characterService";
//import userService from "../../../services/userService";

import _ from "lodash";

const Invitations = () => {
  const [invs, setInvs] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [parties, setParties] = useState([]);

  useEffect(() => {
    console.log("use effect runs");
    const fetchData = async () => {
      const user = authService.getCurrentUser();
      const { data: invs } = await invitationService.getPartyInivitations();
      const { data: parties } = await partyService.getParties();
      const characters = await characterService.getCharactersByUser(user._id);

      const myInvs = [];
      invs.forEach((i) => {
        characters.forEach((c) => {
          if (i.invitedCharId === c._id) {
            const invOwner = i.invOwner;
            const party = parties.filter((p) => p._id === i.partyId)[0];
            const status = i.invStatus;
            const char = characters.filter(
              (ch) => i.invitedCharId === ch._id
            )[0];
            const partyInv = {
              _id: i._id,
              invOwner: invOwner,
              invStatus: status,
              invitedCharId: char,
              partyId: party,
            };
            myInvs.push(partyInv);
          }
        });
      });

      setInvs(myInvs);
      setCharacters(characters);
      setParties(parties);
    };

    fetchData();
  }, []);

  const handleAccept = async (i) => {
    try {
      const { data: inv } = await invitationService.updateStatus(
        i._id,
        "Accepted"
      );
      const invChars = [...invs];
      invChars.forEach((c) => {
        if (c.invitedCharId === i.invitedCharId._id) c.invStatus = "Accepted";
      });
      setInvs(invChars);
    } catch (ex) {
      console.log(ex.response);
    }
  };

  const handleCancel = async (val) => {
    console.log(val);
  };

  return (
    <div className="container-liquid">
      <h2 className="p-5">Invitations</h2>
      <div className="row p-5">
        {invs.length === 0 && (
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Invs</h4>
            <p>There are no invitations yet.</p>
            <p className="mb-0">lul</p>
          </div>
        )}
        {invs.length > 0 && (
          <table className="table">
            <thead className="bg-dark text-white">
              <tr>
                <td>Name</td>
                <td>Vocation</td>
                <td>Inv Status</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {invs.map((i) => (
                <tr key={i._id}>
                  <td>{i.invitedCharId.name}</td>
                  <td>{i.invitedCharId.vocation}</td>
                  <td>{i.invStatus}</td>
                  <td>
                    {i.invStatus === "Pending" && (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => handleAccept(i)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCancel(i)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Invitations;
