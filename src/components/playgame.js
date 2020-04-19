import React from "react";
import i18n from "../i18n";
import PlayCircleFilledWhiteTwoToneIcon from "@material-ui/icons/PlayCircleFilledWhiteTwoTone";

function PlayGame() {
  return (
    <div className="pageCenter">
      <h1>{i18n.t("playgamemsg")}</h1>
      <a
        href="https://smashcorona.000webhostapp.com/"
        rel="noopener noreferrer"
      >
        <PlayCircleFilledWhiteTwoToneIcon
          color="primary"
          style={{ fontSize: 90, marginLeft: "25px" }}
        />
      </a>
    </div>
  );
}

export default PlayGame;
