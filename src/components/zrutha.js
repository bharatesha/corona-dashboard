import React from "react";
import i18n from "../i18n";
import PlayCircleFilledWhiteTwoToneIcon from "@material-ui/icons/PlayCircleFilledWhiteTwoTone";

function Zrutha() {

 const handlePlay = (event) => {
   //document.getElementById('zruthvideo').play();
  // ('#zruthvideo').play();

   let b = document.getElementById("vidButton");

   var v = document.getElementById('zruthvideo');
     if (v.paused) {
      v.play();
       b.textContent ="Pause";
    } else {
      v.pause();
       b.textContent ="Play";
    }
 }

  return (
    <div className="pageCenter" >
    <div>
     <button id="vidButton" onClick={handlePlay}  style={{ cursor: "pointer", marginTop: "40px", width: "100%", marginBottom: "5px", padding: "10px" }} > Play </button>
     </div>
    <div>
       <video id="zruthvideo" >
           <source src="https://drive.google.com/uc?export=view&id=11oIoeBYrFjOXc4rdefsYkeFBGishtA19" type='video/mp4'>
           </source>
       </video>
    </div>
    </div>
  );
}

export default Zrutha;
