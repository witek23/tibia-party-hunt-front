import React from "react";
import { convertGoldValue } from "../../../../utils/convertGoldValue";

const Card = ({ title, supplies, payout }) => {
  const copyToClipboard = (e) => {
    const { value } = e.target;

    navigator.clipboard.writeText(value);
  };

  return (
    <div className="card box-shadow m-3" style={{ width: "20rem" }}>
      <div className="card-body">
        {title && <h4 className="card-title text-center my-3">{title}</h4>}
        <div className="d-flex justify-content-between">
          <p>Due value:</p>
          <p>{convertGoldValue(payout, 3)}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Supplies value:</p>
          <p>{convertGoldValue(supplies, 3)}</p>
        </div>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-sm btn-info"
            value={payout}
            onClick={copyToClipboard}
          >
            Copy Due Value
          </button>
          <button
            className="btn btn-sm btn-info"
            value={supplies}
            onClick={copyToClipboard}
          >
            Copy Supplies Value
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
