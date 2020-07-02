import React from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

const Table = ({ columns, data }) => {
  return (
    <table className="table">
      <TableHead columns={columns} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
