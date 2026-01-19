import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Fragment } from "react";
import ReviewCard from "../ReviewCard";
import { baseURL } from "../../App";

interface Review {
    reviewID: number;
    movieID: number;
    userID: number;
    rating: number;
    title: string;
    comment: string;
    reviewerName: string;
    createdAt: number;
}

interface ReviewResponse {
    status: number;
    message: string;
    review_list?: {
        reviews?: Review[];
    };
    totalReviewCount?: number;
    totalVotes: number;
}

const LIMIT = 10;

async function getMovieReviews(
    movieID: string,
    offset: number,
    limit: number,
    filterBy: number
): Promise<ReviewResponse> {
    const response = await fetch(`${baseURL}/getAllMovieReview/${movieID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offset, limit, filterBy }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch reviews");
    }

    return response.json();
}

export default function AllReviewCommentSection() {
    const { id: movieID } = useParams();

    const {
        data,
        error,
        isError,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["movieReviews", movieID],
        queryFn: ({ pageParam = 0 }) =>
            getMovieReviews(movieID!, pageParam, LIMIT, 0),

        initialPageParam: 0,

        getNextPageParam: (lastPage, allPages) => {
            const loadedCount = allPages.reduce((acc, page) => {
                const reviews = page.review_list?.reviews ?? [];
                return acc + reviews.length;
            }, 0);

            const total = lastPage.totalReviewCount ?? 0;
            return loadedCount < total ? loadedCount : undefined;
        },
    });

    if (isLoading) return <p>Loading reviews...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    const allReviews =
        data?.pages.flatMap(
            (page) => page.review_list?.reviews ?? []
        ) ?? [];

    if (allReviews.length === 0) {
        return (
            <div className="flex flex-row items-center justify-center w-full h-full">
                <p>No reviews yet.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-row items-center justify-center w-full h-full">
            <div className="flex flex-col items-center gap-y-5">
                {data!.pages.map((page, pageIndex) => (
                    <Fragment key={pageIndex}>
                        {(page.review_list?.reviews ?? []).map((review) => (
                            <ReviewCard
                                key={review.reviewID}
                                rating={review.rating}
                                reviewDate={new Date(review.createdAt).toLocaleString()}
                                reviewerName={review.reviewerName}
                                reviewId={review.reviewID.toString()}
                                reviewText={review.comment}
                                reviewTitle={review.title}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>

            <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                        ? "Load More"
                        : "No more reviews to load"}
            </button>
        </div>
    );
}
