import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "../contexts/GameProvider";

const Home = () => {
  const { test } = useContext(GameContext);
  console.log({ test });
  const [code, setCode] = useState("");
  const { push } = useHistory();

  function joinGame(e) {
    e.preventDefault();
    console.log({ code });
    push("/game");
  }

  return (
    <div>
      <form onSubmit={e => joinGame(e)}>
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default Home;
