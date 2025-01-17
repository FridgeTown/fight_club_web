import React, { useRef } from "react";
import styles from "./VolumeBar.module.css";
import useVolume from "../hook/useVolume";

export default function VolumeBar() {
  const { volume, setVolume } = useVolume();
  const volumeBarRef = useRef(null);

  const handleVolumeChange = (e) => {
    const rect = volumeBarRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    let newVolume = Math.round((offsetX / width) * 100);

    if (newVolume < 0) newVolume = 0;
    if (newVolume > 100) newVolume = 100;

    setVolume(newVolume / 100);
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleVolumeChange);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleVolumeChange);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className={styles.volumeContainer}>
      <div className={styles.volumeBarWrapper}>
        <div
          className={styles.volumeBar}
          ref={volumeBarRef}
          onMouseDown={handleMouseDown}
          onClick={handleVolumeChange}
        >
          <div
            className={styles.volumeFill}
            style={{ width: `${volume * 100}%` }}
          ></div>
          <div
            className={styles.volumeThumb}
            style={{ left: `${volume * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
