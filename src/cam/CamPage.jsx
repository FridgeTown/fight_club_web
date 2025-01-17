import { Room, RoomEvent } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import getRandomNickname from "../util/getRandomNickname";

let APPLICATION_SERVER_URL = import.meta.env.VITE_APPLICATION_SERVER_URL;
let LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;
configureUrls();

function configureUrls() {
  if (!APPLICATION_SERVER_URL) {
    if (window.location.hostname === "localhost") {
      APPLICATION_SERVER_URL = "http://localhost:6080/";
    } else {
      APPLICATION_SERVER_URL = "https://" + window.location.hostname + ":6443/";
    }
  }

  if (!LIVEKIT_URL) {
    if (window.location.hostname === "localhost") {
      LIVEKIT_URL = "ws://localhost:7880/";
    } else {
      LIVEKIT_URL = "wss://" + window.location.hostname + ":7443/";
    }
  }
}

export default function CamPage() {
  const navigate = useNavigate();
  const isJoined = useRef(false);

  const { roomName } = useParams();
    
  const [room, setRoom] = useState(null);
  const [participantName] = useState(getRandomNickname());


  async function joinRoom() {
    if (isJoined.current) return; 
    isJoined.current = true;

    const room = new Room({
      audioCaptureOptions: {
        autoGainControl: true,
        noiseSuppression: true,
        echoCancellation: true,
      },
    });
    setRoom(room);

    room.on(RoomEvent.Disconnected, () => {
      setRoom(null);
    });

    try {
      const token = await getToken(roomName, participantName, {
        publishDefaults: {
          audioEncoding: {
            maxBitrate: 64 * 1000, 
          },
        },
      });
      await room.connect(LIVEKIT_URL, token);
      await room.localParticipant.enableCameraAndMicrophone();
    } catch (error) {
      console.log("There was an error connecting to the room:", error.message);
      await leaveRoom();
    }
  }

  async function leaveRoom() {
    await room?.disconnect();

    setRoom(null);
  }

  async function getToken(roomName, participantName) {
    const response = await fetch(APPLICATION_SERVER_URL + "token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ roomName, participantName })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to get token: ${error.errorMessage}`);
    }

    const data = await response.json();
    return data.token;
  }

  async function handleLeave() {
    await leaveRoom(); 
    navigate("/"); 
  }

  useEffect(() => {

    return () => {
      leaveRoom();
    };
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <button onClick={handleLeave}>to main</button>
      <button onClick={joinRoom}>to main</button>
    </div>
  )
}
