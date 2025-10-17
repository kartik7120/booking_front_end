import { useNavigate, useParams } from "react-router"
import ReviewCard, { ReviewCardProps } from "../components/ReviewCard"

interface MovieReviewSectionProps {
    rating: number,
    votings: number,
    totalReviews: number,
    reviews: ReviewCardProps[] | undefined
}

export default function MovieReviewSection(props: MovieReviewSectionProps) {

    const navigate = useNavigate();
    let { id } = useParams<{ id: string }>();


    return (
        <div className="w-full p-8">
            {/* <h2 className="text-4xl">Reviews</h2> */}
            <div className="flex flex-row justify-between items-center flex-wrap">
                <div className="flex flex-col self-start gap-y-4">
                    {/* Left side to mention total reviews, rating of the movie and total votings for the movie before release */}
                    <div>
                        {/* View only rating */}
                        <div className="rating">
                            {
                                Array.from({ length: props.rating }, (_, index) => (
                                    <div className="mask mask-star bg-yellow-500" aria-label={(index + 1) + " star"}></div>
                                ))
                            }
                            {
                                Array.from({ length: 5 - props.rating + 1 }, (_, index) => (
                                    <div className="mask mask-star bg-gray-400" aria-label={(index + 1) + " star"}></div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-evenly gap-y-3 bg-green-600 w-32 h-32 p-2">
                        <p className="text-xl font-bold">{props.votings}</p>
                        <p className="text-xl font-bold">Votings</p>
                    </div>
                    <div className="flex flex-col items-center justify-evenly gap-y-3 bg-orange-600 w-32 h-32 p-2">
                        <p className="text-xl font-bold">{props.totalReviews}</p>
                        <p className="text-xl font-bold">Reviews</p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-y-5 justify-start basis-2/3">
                    {
                        props.reviews && props.reviews.length > 0 ? (
                            props.reviews.map((review) => (
                                <ReviewCard
                                    rating={review.rating}
                                    reviewDate={review.reviewDate}
                                    reviewerName={review.reviewerName}
                                    reviewId={review.reviewId}
                                    reviewText={review.reviewText}
                                    reviewTitle={review.reviewTitle}
                                    key={review.reviewId + review.reviewDate + review.reviewerName + review.reviewText + review.reviewTitle} // unique key for each review
                                />
                            )
                            )
                        ) : (
                            <p>No reviews available</p>
                        )
                    }
                    <button className="btn btn-warning mt-4 w-full" onClick={() => {
                        navigate(`/movie/${id}/reviews`, {
                            state: {
                                movieRating: props.rating,
                                movieVotings: props.votings,
                                movieTotalReviews: props.totalReviews,
                                movieReviews: props.reviews,
                            }
                        }
                        )
                    }}>
                        View More Reviews
                    </button>
                    {/* Add reivew button / Can be added by the logged in or anonymous user */}

                    <button className="btn btn-error w-full" onClick={() => {
                        navigate(`/movie/${id}/add-review`)
                    }}>
                        Add Review
                    </button>
                </div>
            </div>
        </div>
    )
}
