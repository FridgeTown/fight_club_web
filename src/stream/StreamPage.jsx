
import { useEffect } from "react";
import VideoComponent from "./component/VideoComponent";
import AudioComponent from "./component/AudioComponent";
import { useParams } from "react-router";
import Bar from "./component/Bar";
import styles from "./StreamPage.module.css";

import useLiveKit from "./hook/useLiveKit";
import useStreamingSse from "./hook/useStreamingSse";
import AudioProvider from "./context/AudioProvider";
import VolumeProvider from "./context/VolumeProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChildReaching, faFaceSadTear, faHandFist } from "@fortawesome/free-solid-svg-icons";
import Stat from "./component/Stat";

export default function StreamPage() {
  const { roomName } = useParams();
  const { remoteVideoTrack, remoteAudioTrack, joinRoom } = useLiveKit(roomName);
  const { sseData } = useStreamingSse(`${import.meta.env.VITE_STREAMING_URL}/stream/${roomName}`);
  useEffect(() => {
    joinRoom();
    // return () => {
    //   leaveRoom();
    // };
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
        <div>
          <AudioProvider isRemoteAudioTrackExist={!!remoteAudioTrack}>
            <VolumeProvider>
              {remoteVideoTrack && <VideoComponent
                title={roomName}
                key={remoteVideoTrack.trackPublication.trackSid}
                track={remoteVideoTrack.trackPublication.videoTrack}
                participantIdentity={remoteVideoTrack.participantIdentity}
              />}
              {remoteAudioTrack && <AudioComponent
                key={remoteAudioTrack.trackPublication.trackSid}
                track={remoteAudioTrack.trackPublication.audioTrack}
              />}
            </VolumeProvider>
          </AudioProvider>
        </div>

        {sseData && sseData?.player1 && 
          <>
            <div>
              <Bar 
                redScore={sseData.player1.punches.hook + sseData.player1.hits.face * 25 + sseData.player1.hits.body * 10} 
                blueScore={sseData.player2.punches.hook + sseData.player2.hits.face * 25 + sseData.player2.hits.body * 10}
              />
            </div>
            <div className={styles.container}>
              <div className={styles.wrapper}>
                <h3>플레이어1</h3>
                <Stat icon={<FontAwesomeIcon icon={faHandFist} />} value={sseData.player1.punches.hook} label="펀치 수" />
                <Stat icon={<FontAwesomeIcon icon={faFaceSadTear} style={{ fontSize: "1.5rem" }} />}  value={sseData.player1.hits.face} label="얼굴" />
                <Stat icon={<FontAwesomeIcon icon={faChildReaching} />}  value={sseData.player1.hits.body} label="몸" />
              </div>
              <div className={styles.wrapper}>
                <h3>플레이어2</h3>
                <Stat icon={<FontAwesomeIcon icon={faHandFist} />} value={sseData.player1.punches.hook} label="펀치 수" />
                <Stat icon={<FontAwesomeIcon icon={faFaceSadTear} style={{ fontSize: "1.5rem" }} />}  value={sseData.player1.hits.face} label="얼굴" />
                <Stat icon={<FontAwesomeIcon icon={faChildReaching} />}  value={sseData.player1.hits.body} label="몸" />
              </div>
            </div>
          </>
        }
    </div>
  );
}
