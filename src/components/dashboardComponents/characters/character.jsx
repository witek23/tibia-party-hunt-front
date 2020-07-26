import React, { useState, useEffect } from "react";
import characterService from "../../../services/characterService";
import { Redirect } from "react-router-dom";

const Character = (props) => {
  const [character, setCharacter] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: character } = await characterService.getCharacter(
          props.match.params.id
        );

        setCharacter(character);
      } catch (ex) {
        if (ex.response.status === 404) setError("not found");
      }
      setLoading(false);
    };

    fetchData();
  }, [props.match.params.id]);

  if (!loading && error === "not found") return <Redirect to={"/not-found"} />;

  return (
    <>
      <div className="content-container">
        {loading && <h3>Loading...</h3>}
        {character._id && !loading && (
          <div>
            <h2>{character.name}</h2>
            <div>Some character data</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Character;
