import { useEffect, useRef } from 'react'

const useMediaElement = ({ condition = true, track }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (condition && elementRef.current) {
      track.attach(elementRef.current);
    }

    return () => {
      track.detach();
    };
  }, [condition, track]);

  return elementRef;
}

export default useMediaElement;