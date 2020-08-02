import React, { Component } from "react";
import authService from "../../../services/authService";
import partyService from "../../../services/partyService";
import huntService from "../../../services/huntService";
import Select from "../../common/select";
import PayoutTable from "./payoutTable";
import PayoutResults from "./payoutResults";

class Payout extends Component {
  state = {
    parties: [],
    hunts: [],
    user: [],
    currentPartyId: "",
    showResults: false,
  };

  componentDidMount = async () => {
    const user = authService.getCurrentUser();
    this.populateParties(user._id);
  };

  populateParties = async (userId) => {
    const parties = await partyService.getPartyByUser(userId);
    this.setState({ parties });
  };

  populateHunts = async (partyId) => {
    const huntData = await huntService.getHuntsByParty(partyId);
    const hunts = huntData.filter((p) => p.paymentStatus === "Pending");
    hunts.forEach((p) => {
      p.includeInPayout = true;
    });
    this.setState({ hunts });
  };

  changeParty = async (e) => {
    const { value } = e.target;
    const party = this.state.parties.filter((p) => p._id === value)[0];
    this.populateHunts(party._id);

    this.setState({ currentPartyId: party._id });
    this.setState({ showResults: false });
  };

  setIncludeHunt = (hunt) => {
    const huntsCopy = this.state.hunts;
    huntsCopy.forEach((h) => {
      if (h._id === hunt._id) h.includeInPayout = !h.includeInPayout;
    });

    this.setState({ hunts: huntsCopy });
    this.setState({ showResults: false });
  };

  submitData = async (data) => {
    for await (let d of data) {
      for await (let h of d.hunt) {
        delete h.includeInPayout;
        try {
          h.paymentStatus = "Finished";
          await huntService.updatePaymentStatus(h);
        } catch (ex) {
          console.log(ex.response && ex.response);
        }
      }
    }

    this.props.history.push("/dashboard/parties/" + this.state.currentPartyId);
  };

  displayResults = () => {
    this.setState({ showResults: true });
  };

  render() {
    const { hunts, parties, showResults } = this.state;
    return (
      <div>
        <h2>Payout</h2>

        {parties.length > 0 && (
          <>
            <Select
              name="party"
              title="Chose party"
              options={parties}
              onChange={this.changeParty}
            />
            {hunts.length > 0 && (
              <>
                <div className="mt-3">
                  <PayoutTable
                    hunts={hunts}
                    onClick={(h) => this.setIncludeHunt(h)}
                  />
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-info"
                    onClick={this.displayResults}
                  >
                    Display Results
                  </button>
                </div>

                {showResults && (
                  <div className="mt-3">
                    <PayoutResults
                      hunts={hunts}
                      onClick={(p) => this.submitData(p)}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Payout;
