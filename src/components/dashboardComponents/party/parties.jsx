import React, { useState, useEffect } from "react";
import authService from "../../../services/authService";
import partyService from "../../../services/partyService";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Parties = () => {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { _id: userId } = authService.getCurrentUser();
      const parties = await partyService.getPartyByUser(userId);
      console.log(parties);
      //setParties(parties);
    };

    fetchData();
  });
  return (
    <div className="content-container">
      <h2>Parties</h2>
      <div className="row m-5">
        {parties.length > 0 &&
          parties.map((p) => (
            <Card
              key={p._id}
              className="box-shadow mr-3 text-center"
              style={{ width: "15rem" }}
            >
              <Card.Body>
                <Card.Text>
                  <Link
                    className="text-decoration-none"
                    style={{ color: "#000" }}
                    to={"/dashboard/parties/" + p._id}
                  >
                    {p.name}
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Parties;
