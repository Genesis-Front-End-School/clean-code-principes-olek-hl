export const smallScreenStyles = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "1",
  WebkitBoxOrient: "vertical" as "vertical",
};

export const videoSpeedUpKey = "l";
export const videoSpeedDownKey = "j";

export const MAX_PLAYBACK_RATE = 16;
export const MIN_PLAYBACK_RATE = 0.25;

export const playbackRateCaption = (playbackSpeed: string) => {
  return `Playback Speed: ${playbackSpeed.replace(
    "1.00",
    "Normal"
  )}. (Use 'l' button to speed up video or 'j' to slow it down)`;
};
