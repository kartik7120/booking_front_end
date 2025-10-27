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

interface ReviewList {
    reviews: Review[];
}

interface ReviewResponse {
    status: number;
    message: string;
    review_list: ReviewList;
    totalReviewCount: number;
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
        queryFn: ({ pageParam = 0 }) => getMovieReviews(movieID!, pageParam, LIMIT, 0),
        getNextPageParam: (lastPage, allPages) => {
            const totalLoaded = allPages.reduce(
                (acc, page) => acc + page.review_list.reviews.length,
                0
            );
            return totalLoaded < lastPage.totalReviewCount ? totalLoaded : undefined;
        },
        initialPageParam: 0,
    });

    if (isLoading) return <p>Loading reviews...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    return (
        <div>

            <div className="flex flex-col items-center gap-y-5 justify-start">
                {data?.pages.map((page, pageIndex) => (
                    <Fragment key={pageIndex}>
                        {page.review_list.reviews.map((review) => (
                            <ReviewCard rating={review.rating} reviewDate={review.createdAt.toLocaleString()} reviewerName={review.reviewerName} reviewId={review.reviewID.toString()} reviewText={review.comment} reviewTitle={review.title} key={review.reviewID} />
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
                        : <div className="divider">
                            No more reviews to load
                        </div>
                }
            </button>
        </div>
    );
}
