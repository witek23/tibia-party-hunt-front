import React, { useState, useEffect } from "react";
import authService from "../../../services/authService";
import characterService from "../../../services/characterService";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { _id: userId } = authService.getCurrentUser();
      const characters = await characterService.getCharactersByUser(userId);

      setCharacters(characters);
    };

    fetchData();
  }, []);

  return (
    <>
      <h3>Characters</h3>
      <div className="row">
        {characters.length > 0 &&
          characters.map((c) => (
            <Card
              key={c._id}
              className="box-shadow mr-3 text-center"
              style={{ width: "15rem" }}
            >
              <Card.Body>
                <Card.Text>
                  <Link
                    className="text-decoration-none"
                    style={{ color: "#000" }}
                    to={"/dashboard/characters/" + c._id}
                  >
                    {c.name}
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
                to={"/dashboard/characters/add-character"}
              >
                Add Character
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Characters;
