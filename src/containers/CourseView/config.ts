export const smallScreenStyles = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "1",
  WebkitBoxOrient: "vertical" as "vertical",
};

export const playbackRateCaption = (playbackSpeed: string) => {
  return `Playback Speed: ${playbackSpeed.replace(
    "1.00",
    "Normal"
  )}. (Use 'l' button to speed up video or 'j' to slow it down)`;
};
