import React, { useState, useEffect } from "react";
import authService from "../../../services/authService";
import partyService from "../../../services/partyService";
import characterService from "../../../services/characterService";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import _ from "lodash";

const Parties = () => {
  const [myParties, setMyParties] = useState([]);
  const [joinedParties, setJoinedParties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { _id: userId } = authService.getCurrentUser();
      const { data: parties } = await partyService.getParties();
      const myParties = parties.filter((p) => p.ownerId === userId);
      const myCharacters = await characterService.getCharactersByUser(userId);

      const joinedParties = [];
      parties.forEach((p) => {
        p.members.forEach((pm) => {
          myCharacters.forEach((c) => {
            if (c._id === pm && p.ownerId !== userId) joinedParties.push(p);
          });
        });
      });

      _.map(joinedParties, function (o, i) {
        var eq = _.find(myParties, function (e, ind) {
          if (i > ind) {
            return _.isEqual(e, o);
          }
        });
        if (!eq) {
          joinedParties.splice(i, 1);
          return o;
        }
      });

      setJoinedParties(joinedParties);
      setMyParties(myParties);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="">Parties</h2>
      <div className="row">
        {myParties.length > 0 &&
          myParties.map((p) => (
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
      <div className="row">
        {joinedParties.length > 0 &&
          joinedParties.map((j) => (
            <Card
              key={j._id}
              className="box-shadow mr-3 text-center"
              style={{ width: "15rem" }}
            >
              <Card.Body>
                <Card.Text>
                  <Link
                    className="text-decoration-none"
                    style={{ color: "#000" }}
                    to={"/dashboard/parties/" + j._id}
                  >
                    {j.name}
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
      </div>
      <div className="row">
        <Card className="box-shadow mr-3 text-center">
          <Card.Body>
            <Card.Text>
              <Link
                className="text-decoration-none text-muted"
                to={"/dashboard/parties/add-party"}
              >
                Create Party
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Parties;
