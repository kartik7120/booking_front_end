import { useState } from "react";
import { IoPlay } from "react-icons/io5";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
    videoURL: string;
}

export default function VideoPlayer(props: VideoPlayerProps) {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <div className="w-full bg-black text-white p-4 text-center">
                <p className="text-xl font-semibold">Failed to load video player</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 aspect ratio container */}
            <ReactPlayer
                url={props.videoURL}
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
                controls
                playing
                light
                playIcon={<IoPlay size={50} />}
                onError={() => setError(true)}
            />
        </div>
    );
}
