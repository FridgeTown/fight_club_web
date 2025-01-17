import { Room, RoomEvent } from "livekit-client";
import { useState } from "react";
import getRandomNickname from "../../util/getRandomNickname";

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

const useLiveKit = (roomName) => {
  const [room, setRoom] = useState(null);
  const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);
  const [remoteAudioTrack, setRemoteAudioTrack] = useState(null);

  const leaveRoom = async () => {
    await room?.disconnect();
    
    setRoom(null);
    setRemoteVideoTrack(null);
    setRemoteAudioTrack(null);
  }

  const getToken = async (roomName, participantName) => {
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

  const joinRoom = async () => {
    const room = new Room({ autoSubscribe: false });
    setRoom(room);
    
    room.on(
      RoomEvent.TrackSubscribed,
      (_track, publication, participant) => {
        if (publication.kind === "video") {
          setRemoteVideoTrack({ trackPublication: publication, participantIdentity: participant.identity });
        } else {
          setRemoteAudioTrack({ trackPublication: publication })
        }
      }
    );

    room.on(RoomEvent.TrackUnsubscribed, (_track, publication) => {
      if(remoteVideoTrack.trackPublication.trackSid === publication.trackSid) {
        setRemoteVideoTrack(null);
        return;
      }
      if(remoteAudioTrack.trackPublication.trackSid === publication.trackSid) {
        setRemoteAudioTrack(null);
      }
    });

    try {
      const token = await getToken(roomName, getRandomNickname());
      await room.connect(LIVEKIT_URL, token);

    } catch (error) {
      console.log("There was an error connecting to the room:", error.message);
      await leaveRoom();
    }
  }

  return { remoteVideoTrack, remoteAudioTrack, joinRoom, leaveRoom };
}

export default useLiveKit;