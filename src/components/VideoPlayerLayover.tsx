import { BsCalendar2Date } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { FaPlay, FaTicket } from "react-icons/fa6";
import Title from "../stories/Title";
import React from "react";

interface VideoPlayerLayoverProps {
    logoImageURL?: string;
    releaseYear?: string;
    rating?: string;
    duration?: string;
    summary?: string;
    genres?: string[];
    movie_title?: string
    disable_autoplay: boolean;
    SetDisableAutoplay: React.Dispatch<boolean>
}

export default function VideoPlayerLayover({
    duration, genres, logoImageURL, rating, releaseYear, summary, movie_title, disable_autoplay, SetDisableAutoplay
}: VideoPlayerLayoverProps) {

    function handleWatchTralierOnClick(e: React.FormEvent) {
        e.preventDefault();

        const modal = document.getElementById('watch_tralier_modal')

        if (modal instanceof HTMLDialogElement) {
            modal.showModal()
        }
    }

    return (
        <div className="w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-6">
            <div className="flex flex-col flex-wrap items-left">
                <div>
                    {logoImageURL ? <img
                        src={logoImageURL}
                        alt="Logo"
                        className="w-[60vh] h-auto object-contain" /> :
                        <Title title={movie_title || ""} />
                    }
                </div>
                <div className="flex flex-row flex-wrap items-center gap-x-4 mt-4">
                    <div className="flex flex-row items-center gap-x-2">
                        <BsCalendar2Date />
                        <p>{releaseYear}</p>
                    </div>
                    <div className="flex flex-row items-center gap-x-2">
                        <FiClock />
                        <p>{duration}</p>
                    </div>
                    <div className="flex flex-row items-center gap-x-2">
                        <GoStarFill />
                        <p>{rating}</p>
                    </div>
                </div>
                <div className="flex flex-row flex-wrap items-center gap-x-4 mt-4">
                    {
                        genres && genres.length > 0 && genres.map((g) => {
                            return <div className="badge badge-neutral">{g}</div>
                        })
                    }
                </div>
                <div className="max-w-[50%] m-2">
                    <p className="line-clamp-3 leading-relaxed text-xl">
                        {summary}
                    </p>
                </div>
                <div className="flex flex-row flex-wrap items-center gap-x-4">
                    <button className="btn btn-warning" onClick={handleWatchTralierOnClick}>
                        Watch tralier
                        <FaPlay />
                    </button>
                    <button className="btn btn-warning">
                        Book ticket
                        <FaTicket />
                    </button>
                    <button className="btn btn-warning" onClick={() => SetDisableAutoplay(!disable_autoplay)}>
                        {disable_autoplay ? "Enable" : "Disable"} auto play
                    </button>
                </div>
            </div>

        </div>
    )
}

