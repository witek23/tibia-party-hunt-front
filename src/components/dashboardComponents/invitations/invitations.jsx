import React, { Component } from "react";
import authService from "../../../services/authService";
import userService from "../../../services/userService";
import characterService from "../../../services/characterService";
import invService from "../../../services/partyInvitationService";
import partyService from "../../../services/partyService";

class Invitations extends Component {
  state = {
    user: [],
    characters: [],
    invitations: [],
    parties: [],
    loading: true,
  };

  componentDidMount = async () => {
    const { _id: userId } = authService.getCurrentUser();
    this.populateUser(userId);
    const myChars = await this.populateCharacters(userId);
    const parties = await this.populateParties();
    await this.populateInvitations(myChars, parties);
    this.setLoading(false);
  };

  populateUser = async (userId) => {
    const { data: user } = await userService.getUser(userId);
    this.setState({ user });
  };

  populateCharacters = async (userId) => {
    const characters = await characterService.getCharactersByUser(userId);
    this.setState({ characters });

    return characters;
  };

  populateInvitations = async (myChars, parties) => {
    const { data: invs } = await invService.getPartyInivitations();
    const myInvs = invs.filter((i) => {
      return myChars.find((c) => c._id === i.invitedCharId);
    });

    const invitations = [];
    for await (let inv of myInvs) {
      const { data: invOwner } = await userService.getUser(inv.invOwner);
      const party = parties.find((p) => p._id === inv.partyId);
      const invitedChar = myChars.find((c) => c._id === inv.invitedCharId);

      let invItem = {
        _id: inv._id,
        owner: invOwner,
        party: party,
        status: inv.invStatus,
        invitedChar: invitedChar,
      };
      invitations.push(invItem);
    }

    this.setState({ invitations });
  };

  populateParties = async () => {
    const { data: parties } = await partyService.getParties();
    this.setState({ parties });

    return parties;
  };

  setLoading = (state) => {
    this.setState({ loading: state });
  };

  handleChangeStatus = async (invItem, status) => {
    try {
      await invService.updateStatus(invItem._id, status);
      const invitations = [...this.state.invitations];
      invitations.forEach((c) => {
        if (c._id === invItem._id) c.status = status;
      });

      this.setState({ invitations });
      return;
    } catch (ex) {
      console.log(ex.response);
    }
  };

  render() {
    const { invitations, loading } = this.state;
    return (
      <>
        {loading && <div>Loading ...</div>}
        {!loading && (
          <>
            <div className="container-liquid">
              <h2 className="p-5">Invitations</h2>
              <div className="row p-5">
                {invitations.length === 0 && (
                  <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Invs</h4>
                    <p>There are no invitations yet.</p>
                    <p className="mb-0">lul</p>
                  </div>
                )}
                {invitations.length > 0 && (
                  <table className="table">
                    <thead className="bg-dark text-white">
                      <tr>
                        <td>Name</td>
                        <td>Vocation</td>
                        <td>Inv Status</td>
                        <td>Party Name</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {invitations.map((i) => (
                        <tr key={i._id}>
                          <td>{i.invitedChar.name}</td>
                          <td>{i.invitedChar.vocation}</td>
                          <td>{i.status}</td>
                          <td>{i.party.name}</td>
                          <td>
                            {i.status === "Pending" && (
                              <>
                                <button
                                  className="btn btn-success"
                                  onClick={() =>
                                    this.handleChangeStatus(i, "Accepted")
                                  }
                                >
                                  Accept
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    this.handleChangeStatus(i, "Declined")
                                  }
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
          </>
        )}
      </>
    );
  }
}

export default Invitations;
