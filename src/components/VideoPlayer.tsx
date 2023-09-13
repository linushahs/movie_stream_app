import YouTube from "react-youtube";

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  return (
    <div className="video-player w-[200px]">
      <YouTube videoId={videoId} className="w-[200px] aspect-[16/9]" />
    </div>
  );
};

export default VideoPlayer;
