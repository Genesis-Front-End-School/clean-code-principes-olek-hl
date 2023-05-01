import { useState, useEffect, RefObject } from "react";

export const videoSpeedUpKey: string = "l";
export const videoSpeedDownKey: string = "j";

export const MAX_PLAYBACK_RATE: number = 16;
export const MIN_PLAYBACK_RATE: number = 0.25;

const usePaybackSpeedChange = (playerRef: RefObject<HTMLVideoElement>) => {
  const [playbackSpeed, setPlaybackSpeed] = useState<string>("Normal");

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (!playerRef.current) {
        return;
      }
      switch (e.key) {
        case videoSpeedUpKey:
          playerRef.current.playbackRate = Math.min(
            playerRef.current.playbackRate + 0.5,
            MAX_PLAYBACK_RATE
          );
          setPlaybackSpeed(`${playerRef.current.playbackRate.toFixed(2)}`);
        case videoSpeedDownKey:
          playerRef.current.playbackRate = Math.max(
            playerRef.current.playbackRate - 0.25,
            MIN_PLAYBACK_RATE
          );
          setPlaybackSpeed(`${playerRef.current.playbackRate.toFixed(2)}`);
        default:
          return;
      }
    });
  }, []);

  return playbackSpeed;
};

export default usePaybackSpeedChange;
