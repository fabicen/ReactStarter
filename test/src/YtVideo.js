import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import YouTube from 'react-youtube';
const API = "AIzaSyB83PmAm2XuggER8Hm9IiCxPp4SHajqUIs";

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};


const Tutorials = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios(
        "https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=25&channelId=&mine=true&key=AIzaSyB83PmAm2XuggER8Hm9IiCxPp4SHajqUIs"
      );
      setData(results.data.items);
      console.log(results.data.items);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data &&
        data.map((item) => {
          return (
            <Col xs={12} lg={4}>
              <YouTube videoId={item.contentDetails.videoId} opts={opts} />
              {item.contentDetails.videoId}
              <br></br>
              -------------------
              {item.id}
              -------------------
            </Col>
          );
        })}
        
    </div>
    
  );
};

export default Tutorials;
