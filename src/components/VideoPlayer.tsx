import YouTube from "react-youtube";

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  const opts = {
    height: "390",
    width: "640",
  };

  return (
    <div className="video-player">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default VideoPlayer;
