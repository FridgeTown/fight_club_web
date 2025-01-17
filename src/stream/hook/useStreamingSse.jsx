import { useCallback, useEffect, useState } from "react";

const useStreamingSse = (url) => {
  const [sseData, setSseData] = useState({});
  const [eventSource, setEventSource] = useState(null);

  const startSSE = useCallback(() => {
    if (eventSource) {
      console.warn("SSE is already running.");
      return;
    }

    const source = new EventSource(url, { withCredentials: true });

    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSseData(data);
    };

    source.onerror = (error) => {
      console.error("SSE Error:", error);
      source.close();
      setEventSource(null); 
    };

    setEventSource(source);
  }, [url, eventSource]);

  const stopSSE = useCallback(() => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
  }, [eventSource]);

  useEffect(() => {
    startSSE();
    return () => {
      stopSSE();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { sseData, stopSSE };
}

export default useStreamingSse;