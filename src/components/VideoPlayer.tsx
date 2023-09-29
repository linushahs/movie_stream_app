import YouTube from "react-youtube";
import { twMerge } from "tailwind-merge";

const VideoPlayer = ({ videoId, cn }: { videoId: string; cn?: string }) => {
  return (
    <div className="video-player w-full">
      <YouTube
        videoId={videoId}
        className={cn}
        iframeClassName={twMerge("w-full h-auto aspect-[16/9] ", cn)}
      />
    </div>
  );
};

export default VideoPlayer;
