import React from "react";

const TableHead = ({ columns }) => {
  return (
    <thead className="thead-light">
      <tr>
        {columns.map((item) => (
          <th scope="col" key={item.path} style={{ width: item.width }}>
            {item.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
