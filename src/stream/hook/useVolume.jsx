import { useContext } from "react";
import { VolumeContext } from "../context/VolumeContext";


const useVolume = () => {
  return useContext(VolumeContext);
};

export default useVolume;