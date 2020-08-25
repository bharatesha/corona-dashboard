import React from "react";
import i18n from "../i18n";
import PlayCircleFilledWhiteTwoToneIcon from "@material-ui/icons/PlayCircleFilledWhiteTwoTone";

function Zrutha() {
  return (
    <div className="pageCenter" >

       <video  oncontextmenu="return false;" controls>
           <source oncontextmenu="return false;" src="https://drive.google.com/uc?export=view&id=17MoPO-RFTKkNrFwwkqijxBGMtNkcbr2c" type='video/mp4'>
           </source>
       </video>

    </div>
  );
}

export default Zrutha;
