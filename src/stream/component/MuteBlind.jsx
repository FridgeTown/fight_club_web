
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAudio from "../hook/useAudio";
import styles from "./MuteBlind.module.css"
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export default function MuteBlind() {
  const { enableAudio } = useAudio();
  const { audioContext } = useAudio();

  const handleClick = () => {
    enableAudio()
  }
  
  return !audioContext && 
    <div className={styles.mute_blind} onClick={handleClick}>
      <FontAwesomeIcon icon={faVolumeHigh} />
      <p>소리 켜기</p>
    </div>
  
}
