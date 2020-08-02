import React, { Component } from "react";
import Card from "./styling/card";

class PayoutResults extends Component {
  state = {
    payouts: [],
  };

  componentDidMount = () => {
    const { hunts } = this.props;
    const data = [];
    hunts.forEach((hunt) => {
      if (hunt.includeInPayout) {
        const payoutValue = Math.floor(hunt.balance / hunt.members.length);
        hunt.members.forEach((m) => {
          m.huntPayout = m.supplies + payoutValue;
        });
        data.push(hunt);
      }
    });

    const ptMembers = [];
    data.forEach((d) => {
      d.members.forEach((m) => {
        if (!ptMembers.some((p) => p.name === m.name)) {
          ptMembers.push({
            name: m.name,
            payout: m.huntPayout,
            supplies: m.supplies,
            hunt: [d],
          });
        } else {
          for (const pt of ptMembers) {
            if (pt.name === m.name) {
              pt.supplies += m.supplies;
              pt.payout += m.huntPayout;
              pt.hunt.push(d);
            }
          }
        }
      });
    });

    this.setState({ payouts: ptMembers });
  };

  render() {
    const { payouts } = this.state;
    return (
      <>
        {payouts.length > 0 && (
          <div className="container-liquid">
            <div className="d-flex justify-content-center">
              {payouts.map((p) => (
                <Card
                  key={p.name}
                  title={p.name}
                  supplies={p.supplies}
                  payout={p.payout}
                />
              ))}
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                className="btn btn-info"
                onClick={() => this.props.onClick(payouts)}
              >
                Submit Data
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default PayoutResults;
