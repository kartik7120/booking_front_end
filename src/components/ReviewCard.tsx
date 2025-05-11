import { useState, useRef, useEffect } from "react";

export interface ReviewCardProps {
    reviewerName: string;
    reviewDate: string;
    reviewText: string;
    rating: number;
    reviewId: string;
    reviewTitle: string;
}

export default function ReviewCard(props: ReviewCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (textRef.current) {
            // Check if the text exceeds 3 lines
            const { scrollHeight, clientHeight } = textRef.current;
            if (scrollHeight > clientHeight) {
                setIsClamped(true);
            }
        }
    }, []);

    const toggleReviewText = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-gray-600 text-white p-4 rounded-lg shadow-md w-full">
            <div className="flex flex-row justify-between items-center flex-wrap">
                <p className="font-bold text-2xl">{props.reviewTitle}</p>
                <div className="rating">
                    {Array.from({ length: 5 }, (_, index) => (
                        <div
                            key={index}
                            className={`mask mask-star ${index < props.rating ? "bg-yellow-400" : "bg-gray-300"}`}
                            aria-label={`${index + 1} star`}
                        ></div>
                    ))}
                </div>
            </div>
            <div>
                <div className="flex flex-row gap-x-3">
                    <span>By</span>
                    <span className="text-amber-600">{props.reviewerName}</span>
                </div>
            </div>
            <div className="divider"></div>
            <p
                ref={textRef}
                className={`${isExpanded ? "" : "line-clamp-3"
                    } text-justify break-words`}
            >
                {props.reviewText}
            </p>
            {isClamped && (
                <button
                    className="text-blue-400 mt-2 hover:underline"
                    onClick={toggleReviewText}
                >
                    {isExpanded ? "Read Less" : "Read More"}
                </button>
            )}
        </div>
    );
}