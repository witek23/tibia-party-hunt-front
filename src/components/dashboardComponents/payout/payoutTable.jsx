import React from "react";
import Check from "../../common/check";

const PayoutTable = ({ hunts, onClick }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <td>ID</td>
          <td>Balance</td>
          <td>Supplies</td>
          <td>Loot</td>
          <td>Include</td>
        </tr>
      </thead>
      <tbody>
        {hunts.map((h, index) => (
          <tr key={h._id}>
            <td key={index}>{index + 1}</td>
            <td key={h.balance + Math.random()}>{h.balance}</td>
            <td key={h.supplies + Math.random()}>{h.supplies}</td>
            <td key={h.loot + Math.random()}>{h.loot}</td>
            <td key={index + "check"}>
              <Check option={h.includeInPayout} onClick={() => onClick(h)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PayoutTable;
