import ReviewMovieDetails, { ReviewMovieDetailsProps } from '../AddReview/ReviewMovieDetails'

export default function AllReviewsHeader(props: ReviewMovieDetailsProps) {
    return (
        <div>
            <ReviewMovieDetails {...props} />
        </div>
    )
}
