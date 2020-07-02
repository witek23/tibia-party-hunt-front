import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  const renderCell = (item, column) => {
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + column.path;
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
