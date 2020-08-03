import React, { useState, useEffect } from "react";
import authService from "../../../services/authService";
import characterService from "../../../services/characterService";
import Card from "./styling/card";

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
              text={c.name}
              link={"/dashboard/characters/" + c._id}
              width="20rem"
            />
          ))}
      </div>
      <div className="row">
        <Card
          width="10rem"
          text={"+"}
          link={"/dashboard/characters/add-character"}
        />
      </div>
    </>
  );
};

export default Characters;
