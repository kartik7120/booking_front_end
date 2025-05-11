import { useEffect, useRef, useState } from "react";

interface MovieDetailsTopProps {
    movieFormats: string[];
    movieGenres: string[];
    movieLanguages: string[];
    movieDuration: string;
    releaseDate: string;
    summary: string;
}

export default function MovieDetailsTop(props: MovieDetailsTopProps) {
    const { movieFormats, movieGenres, movieLanguages, movieDuration, releaseDate, summary } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const [isClamped, setIsClamped] = useState(false);

    const toggleSummary = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (textRef.current) {
            // Check if the text exceeds 3 lines
            const { scrollHeight, clientHeight } = textRef.current;
            if (scrollHeight > clientHeight) {
                setIsClamped(true);
            }
        }
    }, [])

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {/* Movie formats */}
                {movieFormats.map((format, index) => (
                    <span key={index} className="badge badge-primary">{format}</span>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                {/* Languages */}
                {movieLanguages.map((language, index) => (
                    <span key={index} className="badge badge-secondary">{language}</span>
                ))}
            </div>
            <div className="flex gap-2 mt-2 items-center">
                <div className="badge badge-ghost">{movieDuration}</div>
                <div className="flex gap-2 overflow-x-auto">
                    {/* Movie genres */}
                    {movieGenres.map((genre, index) => (
                        <p className="text-base badge badge-ghost whitespace-nowrap" key={index}>{genre}</p>
                    ))}
                </div>
                <div className="badge badge-ghost">{releaseDate}</div>
            </div>
            <div className="font-semibold text-xl mt-4">
                <p
                    className={`${isExpanded ? "" : "line-clamp-3"
                        } text-justify break-words`}
                >
                    {summary}
                </p>
                {isClamped && <button
                    className="text-blue-500 mt-2 cursor-pointer"
                    onClick={toggleSummary}
                >
                    {isExpanded ? "Read Less" : "Read More"}
                </button>
                }
            </div>
        </div>
    );
}