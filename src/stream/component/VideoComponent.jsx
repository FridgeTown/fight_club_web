import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import styles from "./VideoComponent.module.css";
import useMediaElement from "../hook/useMediaElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faExpand, faPause, faPlay, faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

import Logo from '../../assets/logo-removebg-preview.png'
import VolumeBar from "./VolumeBar";
import useVolume from "../hook/useVolume";
import MuteBlind from "./MuteBlind";


export default function VideoComponent({ title, track }) {
  const { volume, mute, listen } = useVolume();
  const videoElement = useMediaElement({ track });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current); // 기존 타이머 취소
    setIsHovered(true);
  
    timerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 2000);
  };

  const togglePlayPause = () => {
    if (videoElement.current) {
      if (isPlaying) {
        videoElement.current.pause();
      } else {
        videoElement.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;

    if (!document.fullscreenElement) {
      // 전체화면으로 전환
      setIsFullscreen(true);
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        // Safari
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        // Firefox
        container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        // IE/Edge
        container.msRequestFullscreen();
      }
    } else {
      // 전체화면 종료
      setIsFullscreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        // Safari
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
  };

  const getVolumeIcon = () => {
    const vol = volume * 100;
    if(vol === 0) {
      return faVolumeXmark;
    } 
    if(vol < 33) {
      return faVolumeOff;
    }
    if(vol < 66) {
      return faVolumeLow;
    }
    return faVolumeHigh;
  }

  const handleVolumeBtnClick = () => {
    console.log(volume);
    if(volume === 0) {
      listen()
      return;
    }
    mute()
  }

  useEffect(() => {
    setIsPlaying(true);
  }, [])

  return (
    <div ref={containerRef} className={styles.video_container} 
    onMouseEnter={handleMouseEnter}
    onTouchStart={handleMouseEnter}>
      <MuteBlind />
      <video ref={videoElement} id={track.sid} muted />
      <div 
        className={`${styles.shadow} ${isHovered ? styles.hovered : ""}`}
      >
        <div className={styles.video_title}>{title}</div>
        <div className={styles.logo_container}><img src={Logo} /></div>
        <button className={styles.start_btn} onClick={togglePlayPause}>
          {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
        </button>
        <button className={styles.volume_btn} onClick={handleVolumeBtnClick}><FontAwesomeIcon icon={getVolumeIcon()} /></button>
        <VolumeBar />
        <button className={styles.fullscreen_btn} onClick={toggleFullscreen}>
          {isFullscreen ? <FontAwesomeIcon icon={faCompress} /> : <FontAwesomeIcon icon={faExpand} />}
        </button>
      </div>
    </div>
  );
}

VideoComponent.propTypes = {
  track: PropTypes.shape({
    sid: PropTypes.string,
    attach: PropTypes.func,
    detach: PropTypes.func
  }),
  title: PropTypes.string,
}