import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import VideoPlayerLayover from "./VideoPlayerLayover";
import { formatDuration } from "../utils/util";

interface VideoPlayerProps {
    videoURL: string;
    posterURL?: string;
    logoImageURL?: string;
    releaseYear?: string;
    rating?: string;
    duration?: number;
    summary?: string;
    genres?: string[];
    movie_title?: string;
}

export default function VideoPlayer({ videoURL, posterURL, duration, logoImageURL, rating, releaseYear, summary, genres, movie_title }: VideoPlayerProps) {
    const [error, setError] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [disableAutoPlay, setDisableAutoPlay] = useState(false)
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = modalRef.current;
        if (!dialog) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (e.target === dialog) {
                dialog.close();
            }
        };

        dialog.addEventListener("click", handleClickOutside);
        return () => dialog.removeEventListener("click", handleClickOutside);
    }, []);

    if (error) {
        return (
            <div className="flex items-center justify-center w-full aspect-video bg-black rounded-lg">
                <span className="text-white text-sm">Video unavailable</span>
            </div>
        );
    }

    const reactPlayerClass =
        `absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out z-10 pointer-events-none ` +
        (isReady ? "opacity-100" : "opacity-0");

    return (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <dialog id="watch_tralier_modal" className="modal" ref={modalRef}>
                <div className="w-2/3 h-2/3 flex items-center justify-center">
                    <ReactPlayer
                        url={videoURL}
                        controls
                        width="80%"
                        height="80%"
                    />
                </div>
            </dialog>
            {/* Poster or black background until video is ready */}
            {(!isReady || disableAutoPlay) && (
                posterURL ? (
                    <img
                        src={posterURL}
                        alt="Video preview"
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />
                ) : (
                    <div className="absolute top-0 left-0 w-full h-full bg-black z-0" />
                )
            )}

            {/* Video */}
            {!disableAutoPlay && (
                <div className={reactPlayerClass}>
                    {/* Gradient overlay */}
                    <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Video */}
                    <ReactPlayer
                        url={videoURL}
                        width="100%"
                        height="100%"
                        controls={false}
                        playing={true}
                        muted={true}
                        loop={true}
                        onPlay={() => setIsReady(true)}
                        onError={() => setError(true)}
                        config={{
                            youtube: {
                                playerVars: {
                                    autoplay: 1,
                                    controls: 0,
                                    modestbranding: 1,
                                    rel: 0,
                                    fs: 0,
                                    disablekb: 1,
                                    iv_load_policy: 3,
                                    playsinline: 1,
                                },
                            },
                        }}
                    />
                </div>
            )}

            {/* Layover on top of everything */}
            <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-auto">
                <VideoPlayerLayover
                    SetDisableAutoplay={setDisableAutoPlay}
                    disable_autoplay={disableAutoPlay}
                    duration={formatDuration(duration || 0)}
                    genres={genres}
                    logoImageURL={logoImageURL}
                    movie_title={movie_title}
                    rating={rating}
                    releaseYear={releaseYear}
                    summary={summary}
                />
            </div>
        </div>
    );
}
