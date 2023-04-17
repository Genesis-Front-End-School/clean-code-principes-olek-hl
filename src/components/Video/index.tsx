// гадаю варто видалити нижній рядок який не використовується
import { useRef, RefObject } from "react";
import ReactHlsPlayer from "react-hls-player";

import "./styles.css";

export interface IVideoProps {
  videoUrl: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  position?: "static" | "relative" | "absolute" | "sticky" | "fixed";
  styles?: React.CSSProperties;
    // гадаю не варто використовувати тип any
  playerRef: any;
  onVideoClick?: () => void;
  onProgress?: (e: any) => void;
}

const VideoComponent = ({
  videoUrl,
  autoPlay = true,
  controls = false,
  position = "absolute",
  styles,
  playerRef,
  onProgress,
  muted = true,
  onVideoClick,
}: IVideoProps) => {
  return (
    <div className="preview-video-container" onClick={() => onVideoClick?.()}>
      <ReactHlsPlayer
        playerRef={playerRef}
        src={videoUrl}
        autoPlay={autoPlay}
        controls={controls}
        muted={muted}
        onTimeUpdate={onProgress}
        style={{
          position: position,
          width: "100%",
          height: "100%",
          cursor: "pointer",
          top: 0,
          ...styles,
        }}
      />
    </div>
  );
};

export default VideoComponent;
