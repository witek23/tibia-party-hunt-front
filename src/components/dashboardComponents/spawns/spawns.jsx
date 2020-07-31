import React, { useState, useEffect } from "react";
import spawnService from "../../../services/spawnService";
import Table from "../../common/table";

const columns = [
  {
    label: "Name",
    path: "name",
  },
];

const Spawns = () => {
  const [spawns, setSpawns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: spawns } = await spawnService.getSpawns();

      setSpawns(spawns);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>Spawn List</h3>
      <Table columns={columns} data={spawns} />
    </div>
  );
};

export default Spawns;
