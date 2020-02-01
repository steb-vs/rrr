import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  input: {
    width: "90%",
    height: "2rem",
    display: "block"
  }
});

const Home = () => {
  const classes = useStyle();
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
          className={classes.input}
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
