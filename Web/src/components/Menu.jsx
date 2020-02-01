import React from "react";
import pieces from "../constants/pieces";
import GameButton from "./GameButton";

const Menu = () => {
  const [mainButtons, setMainButtons] = useState(true);

  function handleMainClick() {
    setMainButtons(!mainButtons);
  }

  const buttons = Object.keys(pieces);
  return (
    <div>
      {mainButtons &&
        buttons.map((piece, i) => <GameButton key={i} type={piece} />)}
    </div>
  );
};

export default Menu;
