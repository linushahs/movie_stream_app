import YouTube from "react-youtube";

const VideoPlayer = ({ videoId }: { videoId: string }) => {
  return (
    <div className="video-player w-full">
      <YouTube videoId={videoId} iframeClassName="w-full aspect-[16/9]" />
    </div>
  );
};

export default VideoPlayer;
