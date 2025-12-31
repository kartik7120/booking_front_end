import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";
import { baseURL } from "../../App";

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

    const response = await fetch(`${baseURL}/addReview/${movieID}`, {
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
  const { id: movieID } = useParams();

  const {
    mutate: submitReview,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (newReview: AddReviewParams) => AddReviewHandler(newReview),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewTitle || rating === 0) {
      alert("Please add a title and rating.");
      return;
    }
    if (!movieID) return alert("Movie ID is missing.");

    submitReview({
      reviewTitle,
      reviewBody,
      rating,
      containsSpoiler,
      format,
      language,
      movieID,
      userID: -1,
      reviewerName: "John Doe",
    });
  };

  return (
    <div className="max-w-2xl mx-auto rounded-2xl border border-default bg-neutral-primary-soft shadow-sm p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Review Title */}
        <div>
          <label className="block mb-2 text-sm font-medium text-heading">
            Review title
          </label>
          <input
            type="text"
            className="block w-full rounded-base border border-default bg-neutral-secondary-medium p-2.5 text-heading focus:border-brand focus:ring-brand"
            placeholder="Enter review title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-2 text-sm font-medium text-heading">
            Your rating
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-3xl transition ${
                  star <= rating ? "text-yellow-400" : "text-neutral-500"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Review Body */}
        <div>
          <label className="block mb-2 text-sm font-medium text-heading">
            Review body
          </label>
          <textarea
            rows={5}
            maxLength={300}
            className="block w-full rounded-base border border-default bg-neutral-secondary-medium p-2.5 text-heading focus:border-brand focus:ring-brand"
            placeholder="Tell us what you liked or didn’t like..."
            value={reviewBody}
            onChange={(e) => setReviewBody(e.target.value)}
          />
          <p className="mt-1 text-right text-sm text-text-muted">
            {remainingChars} characters left
          </p>
        </div>

        {/* Format & Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-heading">
              Format
            </label>
            <select
              className="block w-full rounded-base border border-default bg-neutral-secondary-medium p-2.5 text-heading focus:border-brand focus:ring-brand"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="">Select format</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
              <option value="4DX">4DX</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-heading">
              Language
            </label>
            <select
              className="block w-full rounded-base border border-default bg-neutral-secondary-medium p-2.5 text-heading focus:border-brand focus:ring-brand"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Select language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
            </select>
          </div>
        </div>

        {/* Spoiler */}
        <div className="flex items-center gap-2">
          <input
            id="spoiler"
            type="checkbox"
            checked={containsSpoiler}
            onChange={(e) => setContainsSpoiler(e.target.checked)}
            className="h-4 w-4 rounded border-default text-brand focus:ring-brand"
          />
          <label htmlFor="spoiler" className="text-sm text-heading">
            Contains spoilers
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setReviewTitle("");
              setReviewBody("");
              setRating(0);
              setContainsSpoiler(false);
              setFormat("");
              setLanguage("");
            }}
            className="rounded-base border border-default px-4 py-2 text-sm font-medium text-heading hover:bg-neutral-tertiary"
          >
            Clear
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="rounded-base bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium"
          >
            {isPending ? "Submitting..." : "Submit review"}
          </button>
        </div>

        {/* Status */}
        {isError && (
          <div className="rounded-base border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error?.message || "Failed to submit review"}
          </div>
        )}
      </form>
    </div>
  );
}

