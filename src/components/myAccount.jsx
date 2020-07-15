import React, { useState, useEffect } from "react";
import authService from "../services/authService";
import * as userService from "../services/userService";
import * as characterService from "../services/characterService";
import * as partiesService from "../services/partyService";
import MyCharactersTable from "./myAccount/myCharactersTable";
import MyPartiesTable from "./myAccount/myPartiesTable";
import JoinedPartiesTable from "./myAccount/joinedPartiesTable";

const MyAccount = () => {
  const [user, setUser] = useState({});
  const [characters, setCharacters] = useState([]);
  const [myParties, setMyParties] = useState([]);
  const [parties, setParties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const auth = authService.getCurrentUser();
      const user = await userService.getUser(auth._id);
      setUser(user.data);

      const { data: charactersList } = await characterService.getCharacters();
      const characters = charactersList.filter((c) => {
        if (c.ownerId === user.data._id) return c;
        return null;
      });
      setCharacters(characters);

      const { data: partiesList } = await partiesService.getParties();
      setParties(partiesList);
      const myParties = partiesList.filter((p) => p.ownerId === user.data._id);
      setMyParties(myParties);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container my-5">
        <h1 className="mb-5">Welcome, {user.name}!</h1>
        <div className="row">
          <div className="col-sm-12 mb-3">
            <MyCharactersTable characters={characters} />
          </div>
          <div className="col-sm-12 mb-3">
            <div className="row">
              <div className="col-sm-6">
                <MyPartiesTable parties={myParties} />
              </div>
              <div className="col-sm-6">
                <JoinedPartiesTable
                  parties={parties}
                  characters={characters}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
