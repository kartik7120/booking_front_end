import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import VideoPlayer from "../components/VideoPlayer";
import CastCrewList from "../components/CastCrewList";
import MovieReviewSection from "./MovieReviewSection";
import useStore from "./../zustand/store";

async function fetchMovieDetails(id: number) {
    const res = await fetch(`http://localhost:8080/getMovie/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
}

export async function GetIdempotentKey(): Promise<{ idempotent_key: string }> {
    const response = await fetch("http://localhost:8080/getIdempotentKey");
    return response.json();
}

interface MovieDetailsResponse {
    title: string;
    description: string;
    duration: number;
    language: string[];
    type: string[];
    cast_crew: {
        name: string;
        character_name: string;
        photourl: string;
    }[];
    poster_url: string;
    trailer_url: string;
    release_date: string;
    movie_resolution: string[];
    votes: number;
    id: number;
    logoImageURL: string;
}

interface MovieReviewResponse {
    status: 200;
    message: string;
    review_list: review_list;
    totalReviewCount: number;
    totalVotes: number;
}

interface review_list {
    reviews: {
        movieID: number;
        userID: number;
        rating: number;
        comment: string;
        title: string;
        reviewID: string;
        createdAt: string;
        reviewerName: string;
    }[];
}

function calculateAverageRating(reviews: review_list | undefined): number {
    if (!reviews || !reviews.reviews || reviews.reviews.length === 0) return 0;
    const totalRating = reviews.reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.reviews.length;
}

export default function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const store = useStore();
    const setIdempotencyKey = useStore((state) => state.setIdempotencyKey);

    if (!id) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
                <h2 className="text-2xl font-semibold mb-4">Movie not found</h2>
                <p className="text-gray-500 mb-6">
                    We couldn’t load the movie details. Please check the URL or try again.
                </p>
                <button className="btn btn-error" onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        );
    }

    const { data: movieDetails, error, status, isError } = useQuery<MovieDetailsResponse>({
        queryKey: ["movieDetails", id],
        queryFn: () => fetchMovieDetails(Number(id)),
        enabled: !!id,
        refetchOnWindowFocus: false,
        retry: true,
        retryDelay: 1000,
        staleTime: 1000 * 60 * 5,
    });

    const {
        data: idempotentKey,
        error: idempotentKeyError,
        status: idempotentKeyStatus,
        isError: idempotentKeyIsError,
    } = useQuery({
        queryKey: ["idempotentKey"],
        queryFn: () => GetIdempotentKey(),
        refetchOnWindowFocus: false,
        retry: true,
        retryDelay: 1000,
    });

    // ✅ only set idempotent key once when query succeeds
    useEffect(() => {
        if (idempotentKeyStatus === "success" && idempotentKey) {
            if (store.idempotencyKey !== idempotentKey.idempotent_key) {
                console.log(`setting idempotent key in store: ${idempotentKey.idempotent_key}`);
                setIdempotencyKey(idempotentKey.idempotent_key);
            }
        }
    }, [idempotentKeyStatus, idempotentKey, setIdempotencyKey, store.idempotencyKey]);

    if (idempotentKeyIsError) {
        console.error("Error fetching idempotent key:", idempotentKeyError);
    }

    const {
        data: movieReviews,
        error: movieReviewResponseError,
        status: movieReviewResponseStatus,
        isError: movieReviewResponseIsError,
    } = useQuery<MovieReviewResponse>({
        queryKey: ["movieReviews", id],
        queryFn: async () =>
            fetch(`http://localhost:8080/getAllMovieReview/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    limit: 5,
                    offset: 0,
                    sortBy: 0,
                    filterBy: 0,
                }),
            }).then((res) => res.json()),
        enabled: !!id,
        refetchOnWindowFocus: false,
        retry: true,
        retryDelay: 1000,
        staleTime: 1000 * 60 * 5,
    });

    if (isError) return <div>Error: {error.message}</div>;

    if (status === "pending") {
        return (
            <div className="animate-fadeIn px-4 py-6 space-y-6">
                {/* Poster Skeleton */}
                <div className="w-full h-[300px] bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
                    <span className="text-gray-500">Loading trailer...</span>
                </div>
                {/* Title & Summary Skeleton */}
                <div className="space-y-2">
                    <div className="h-6 w-2/3 bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse" />
                </div>
                {/* Cast & Crew Skeleton */}
                <div className="space-y-4">
                    <div className="h-5 w-1/3 bg-gray-600 rounded animate-pulse" />
                    <div className="flex space-x-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-20 h-20 bg-gray-700 rounded-full animate-pulse" />
                        ))}
                    </div>
                </div>
                {/* Reviews Skeleton */}
                <div className="space-y-2">
                    <div className="h-5 w-1/2 bg-gray-600 rounded animate-pulse" />
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-700 rounded animate-pulse" />
                    ))}
                </div>
                {/* Book Tickets Button Placeholder */}
                <div className="fixed bottom-0 right-0 w-full px-4 py-3 bg-gray-800 text-center text-gray-400 animate-pulse">
                    Loading ticket options...
                </div>
            </div>
        );
    }

    if (status === "success") {
        console.log("Movie Details:", movieDetails);
    }

    return (
        <div className="m-4">
            <VideoPlayer
                videoURL={movieDetails.trailer_url || ""}
                duration={movieDetails.duration}
                genres={movieDetails.type}
                logoImageURL={""}
                rating={"0"}
                movie_title={movieDetails.title}
                posterURL={movieDetails.poster_url}
                releaseYear={movieDetails.release_date}
                summary={movieDetails.description}
            />
            <div className="divider"></div>
            <div className="flex flex-col items-start">
                {movieDetails.cast_crew && movieDetails.cast_crew.length > 0 && (
                    <CastCrewList cast_crew={movieDetails.cast_crew} />
                )}
            </div>
            <div className="divider"></div>
            <div>
                <MovieReviewSection
                    isLoading={movieReviewResponseStatus === "pending"}
                    rating={calculateAverageRating(movieReviews?.review_list)}
                    votings={movieReviews?.totalVotes || 0}
                    totalReviews={movieReviews?.totalReviewCount || 0}
                    error={movieReviewResponseError}
                    isError={
                        movieReviewResponseIsError
                    }

                    reviews={
                        movieReviews?.review_list?.reviews?.map((review) => ({
                            rating: review.rating,
                            reviewDate: new Date().toLocaleDateString(),
                            reviewerName: review.reviewerName,
                            reviewId: review.userID.toString() + review.movieID.toString(),
                            reviewText: review.comment,
                            reviewTitle: review.title,
                        })) || undefined
                    }
                />
            </div>
            <div className="sticky bottom-0 z-50 bg-base-100 px-4 py-3 shadow-md">
                <button
                    disabled={!store.idempotencyKey || idempotentKeyStatus !== "success"}
                    className={`btn btn-error w-full ${idempotentKeyStatus === "pending" ? "loading" : ""
                        }`}
                    onClick={() =>
                        navigate(`/movie/${id}/movieTimeSlots`, {
                            state: { movieDetails },
                        })
                    }
                >
                    Book Tickets
                </button>
            </div>
        </div>
    );
}
