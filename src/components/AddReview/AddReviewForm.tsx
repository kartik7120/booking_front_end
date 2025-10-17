import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";

async function AddReviewHandler({
    reviewTitle,
    reviewBody,
    rating,
    containsSpoiler,
    format,
    language,
    movieID,
    userID,
    reviewerName,
}: AddReviewParams) {

    if (!movieID) {
        throw new Error("Movie ID is required");
    }

    const response = await fetch(`http://localhost:8080/addReview/${movieID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: reviewTitle,
            comment: reviewBody,
            rating: rating,
            containsSpoiler,
            format,
            language,
            userID,
            reviewerName
        })
    });

    if (!response.ok) {
        throw new Error("Failed to submit review");
    }

    return response.json();
}

interface AddReviewParams {
    reviewTitle: string;
    reviewBody: string;
    rating: number;
    containsSpoiler: boolean;
    format: string;
    language: string;
    movieID: string;
    userID: number;
    reviewerName: string;
}

export default function AddReviewForm() {

    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewBody, setReviewBody] = useState("");
    const [rating, setRating] = useState(0);
    const [containsSpoiler, setContainsSpoiler] = useState(false);
    const [format, setFormat] = useState("");
    const [language, setLanguage] = useState("");

    const remainingChars = 300 - reviewBody.length;

    const params = useParams();

    const movieID = params.id;

    const {
        mutate: submitReview,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: (newReview: AddReviewParams) => AddReviewHandler(newReview),
        onSuccess: (data) => {
            console.log("Review submitted successfully:", data);
            // Optionally reset form fields here
        },
        onError: (error: any) => {
            console.error("Error submitting review:", error.message);
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewTitle || rating === 0) return alert("Please add a title and rating.");

        if (!movieID) return alert("Movie ID is missing.");

        console.log({ reviewTitle, reviewBody, rating, containsSpoiler, format, language });

        submitReview({
            reviewTitle,
            reviewBody,
            rating,
            containsSpoiler,
            format,
            language,
            movieID,
            userID: -1, // Replace with actual user ID from auth context or state
            reviewerName: "John Doe" // Replace with actual user name from auth context or state
        });
    };

    return (
        <div className="border-2 border-gray-600 rounded-2xl p-8 shadow-md max-w-2xl mx-auto text-white">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter review title"
                    className="input input-bordered focus:ring-2 focus:ring-yellow-400"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                />

                <div>
                    <label className="text-xl font-semibold">Your Rating</label>
                    <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => setRating(star)}
                                className={`cursor-pointer text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-400"
                                    }`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-2xl">Review body</legend>
                    <textarea
                        className="textarea textarea-lg h-32 focus:ring-2 focus:ring-yellow-400"
                        placeholder="Tell us what you loved or didn’t like..."
                        value={reviewBody}
                        onChange={(e) => setReviewBody(e.target.value)}
                        maxLength={300}
                    />
                    <div className="text-sm text-gray-400 text-right">{remainingChars} characters left</div>
                </fieldset>

                <div className="flex flex-col sm:flex-row gap-4">
                    <select className="select select-bordered w-full" onChange={(e) => setFormat(e.target.value)}>
                        <option value="">Select format</option>
                        <option value="2D">2D</option>
                        <option value="3D">3D</option>
                        <option value="IMAX">IMAX</option>
                        <option value="4DX">4DX</option>
                    </select>

                    <select className="select select-bordered w-full" onChange={(e) => setLanguage(e.target.value)}>
                        <option value="">Select language</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                    </select>
                </div>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={containsSpoiler}
                        onChange={(e) => setContainsSpoiler(e.target.checked)}
                    />
                    Contains spoilers
                </label>

                <div className="flex justify-between">
                    <button type="submit" className="btn btn-primary">
                        Submit Review
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => {
                            setReviewTitle("");
                            setReviewBody("");
                            setRating(0);
                            setContainsSpoiler(false);
                            setFormat("");
                            setLanguage("");
                        }}
                    >
                        Clear
                    </button>
                </div>
            </form>
            {
                isPending && <p className="text-blue-500 mt-4">Submitting your review...</p>
            }
            {
                isError && <p className="text-red-500 mt-4">Error: {error || "An error occurred while submitting your review."}</p>
            }
        </div>
    );
}
