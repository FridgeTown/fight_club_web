
import PropTypes from "prop-types";
import useAudio from "../hook/useAudio";
import { useEffect } from "react";
import useMediaElement from "../hook/useMediaElement";
import useVolume from "../hook/useVolume";

export default function AudioComponent({ track }) {
  const { volume } = useVolume();
  const { audioContext } = useAudio();
  const audioRef = useMediaElement({ condition: audioContext, track });
  
  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef])

  return !!audioContext && <audio ref={audioRef} id={track.sid} controls={false} />
}

AudioComponent.propTypes = {
  track: PropTypes.shape({
    sid: PropTypes.string,
    attach: PropTypes.func,
    detach: PropTypes.func
  }),
  volume: PropTypes.number,
  handleVolumeChange: PropTypes.func
}
