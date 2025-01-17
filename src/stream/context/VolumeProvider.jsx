import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from 'react'
import { VolumeContext } from "./VolumeContext";

export default function VolumeProvider({ children }) {
  const [prevVolume, setPrevVolume] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const mute = useCallback(() => {
    setPrevVolume(volume);
    setVolume(0);
  }, [volume])

  const listen = useCallback(() => {
    setVolume(prevVolume);
  }, [prevVolume])

  const value = useMemo(
    () => ({
      volume,
      setVolume,
      mute,
      listen
    }),
    [volume, setVolume, mute, listen]
  );

  return (
    <VolumeContext.Provider value={value}>{children}</VolumeContext.Provider>
  )
}

VolumeProvider.propTypes = {
  children: PropTypes.node
}
