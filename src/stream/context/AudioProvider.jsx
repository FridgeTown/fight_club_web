import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from 'react'
import { AudioContext } from "./AudioContext";

export default function AudioProvider ({ isRemoteAudioTrackExist, children }) {
  const [audioContext, setAudioContext] = useState(null);

  const enableAudio = useCallback(() => {
    if (!audioContext && isRemoteAudioTrackExist) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      context.resume().then(() => {
        setAudioContext(context);
      }).catch((error) => {
        console.error("Error resuming AudioContext", error);
      });
    }
  }, [audioContext, isRemoteAudioTrackExist]);

  const value = useMemo(
    () => ({
      audioContext,
      enableAudio,
    }),
    [audioContext, enableAudio]
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  )
}

AudioProvider.propTypes = {
  isRemoteAudioTrackExist: PropTypes.bool,
  children: PropTypes.node
}
