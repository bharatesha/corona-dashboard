import React, { useState, useEffect } from "react";
import i18n from "../i18n";
import { withNamespaces } from "react-i18next";
import PlayCircleFilledWhiteTwoToneIcon from "@material-ui/icons/PlayCircleFilledWhiteTwoTone";
import axios from "axios";
import queryString from 'query-string';

const history = require("history").createBrowserHistory;

function Zrutha({ props, t }) {

  let videoid = queryString.parse(history(props).location.search).id;

  const url = "https://vimeo.com/453084320";

  const [videoList, setVideoList] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
      if (fetched === false) {
        getVideoList();
      }
    }, [fetched]);

    const getVideoList = async () => {
      try {
        const [response] = await Promise.all([
          axios.get("https://api.vimeo.com/users/119105568/videos", {
                       headers: {
                         Authorization: 'basic MDU1MzdhOWY1MjIzNWQ0OWQ2YjdiYWZjMDdlMDFhZTcxNThlMjUwMjprSVpyYVJEaVZycUhTd3FtSlMvTjRUdjhSQ1B4LyswaUxtVVUrUUs2UXVBQjNCNG14SytzSFlESHo3NSs1K0JoZ1N4aGNkdjJIMllwOEc5dHZJK0FzMmdtMTBSVWZuWGZiN0g1NnIrZFB3b0FNUyttQ2V5WnoxdllTSlQrOUN3Tg=='
                       }
                  }),
        ]);
        console.log(response.data.data);
        setVideoList(response.data.data);
       console.log(response.data.data[0].pictures.uri);
        setFetched(true);
      } catch (err) {
        console.log(err);
      }
    };

   if(fetched)
      getVideosList();

  function getVideosList(){
  console.log(videoList);
    console.log('Get videos  '+videoList[0].pictures.uri);
    var video_player = document.getElementById("video_player"),
    links = video_player.getElementsByTagName('a');
    for (var i=0; i<links.length; i++) {
        links[i].onclick = handler;
    }
  }

  function handler(e) {
  	e.preventDefault();
 /* 	videotarget = this.getAttribute("href");
  	filename = videotarget.substr(0, videotarget.lastIndexOf('.')) || videotarget;
  	video = document.querySelector("#video_player video");
  	video.removeAttribute("controls");
  	video.removeAttribute("poster");
  	source = document.querySelectorAll("#video_player video source");
  	source[0].src = filename + ".mp4";
  	source[1].src = filename + ".webm";
  	video.load();
  	video.play();*/
  }


 const handlePlay = (event) => {
   getVideosList();

   //document.getElementById('zruthvideo').play();
  // ('#zruthvideo').play();
  //11oIoeBYrFjOXc4rdefsYkeFBGishtA19

  //listGDriveFiles();

   //listFiles();

   /* <!-- <div>
        <button id="vidButton" onClick={handlePlay}  style={{ cursor: "pointer", marginTop: "40px", width: "100%", marginBottom: "5px", padding: "10px" }} > Play </button>
        </div>
       <div>
          <video id="zruthvideo" >
              <source src={url} type='video/mp4'>
              </source>
          </video>
       </div>-->*/

  /* let b = document.getElementById("vidButton");

   var v = document.getElementById('zruthvideo');
     if (v.paused) {
      v.play();
       b.textContent ="Pause";
    } else {
      v.pause();
       b.textContent ="Play";
    }*/
 }

  return (
    <div className="pageCenter" >

<figure id="video_player" style={{margin:"50px"}}>

	<iframe src="https://player.vimeo.com/video/453084320" width="640" height="480" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

	<figcaption>
		<a href="nambia1.mp4"><img src="https://i.vimeocdn.com/video/949138264_100x75.jpg" alt="Nambia Timelapse 1"/></a>
		<a href="nambia2.mp4"><img src="https://i.vimeocdn.com/video/949138264_100x75.jpg" alt="Nambia Timelapse 2"/></a>
		<a href="nambia3.mp4"><img src="https://i.vimeocdn.com/video/949138264_100x75.jpg" alt="Nambia Timelapse 3"/></a>
	</figcaption>
</figure>




    </div>
  );
}

export default withNamespaces()(Zrutha);
