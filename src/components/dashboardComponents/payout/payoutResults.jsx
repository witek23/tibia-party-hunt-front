import React, { Component } from "react";

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
          ptMembers.push({ name: m.name, payout: m.huntPayout, hunt: [d] });
        } else {
          for (const pt of ptMembers) {
            if (pt.name === m.name) {
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
          <>
            <ul>
              {payouts.map((p) => (
                <li key={p.name}>
                  {p.name}: {p.payout}
                </li>
              ))}
            </ul>
            <button
              className="btn btn-info"
              onClick={() => this.props.onClick(payouts)}
            >
              Submit Data
            </button>
          </>
        )}
      </>
    );
  }
}

export default PayoutResults;
