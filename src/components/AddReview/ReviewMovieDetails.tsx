import Title from '../../stories/Title';

export interface ReviewMovieDetailsProps {
    movieTitle?: string;
    moviePosterUrl?: string;
    movieReleaseDate?: string;
    movieTitlePosterURL?: string;
    movieRating?: number;
    userRating?: number;
}

export default function ReviewMovieDetails(props: ReviewMovieDetailsProps) {
    return (
        <div>
            <div className='bg-gray-600 flex flex-row justify-evenly items-center border border-gray-400 p-4 mb-4 rounded-lg'>

                <div className='p-3 mb-3 d-flex gap-3'>
                    <img src={props.moviePosterUrl} alt={props.movieTitle} style={{ width: '150px', height: '225px' }} />
                </div>

                <div className='d-flex flex-column justify-content-center'>

                    {
                        props.movieTitlePosterURL && <img src={props.movieTitlePosterURL} alt={props.movieTitle} style={{ width: '200px', height: '100px' }} className='object-contain' />
                    }

                    {!props.movieTitlePosterURL && props.movieTitle && <Title title={props.movieTitle} />}

                    <p className="text-white mt-2 text-2xl font-semibold">
                        Release Date: {props.movieReleaseDate}
                    </p>

                    <div className='flex flex-row items-center gap-4 mt-2'>

                        <p className="text-white text-2xl font-semibold">
                            Average Rating: {props.movieRating}
                        </p>

                    </div>

                    <div className='flex flex-row items-center gap-4 mt-2'>

                        <p className="text-white text-2xl font-semibold">
                            Your rating: {props.userRating || "Not rated yet"}
                        </p>

                        {/* {
                        props.userRating && <div className="rating">

                            {
                                [...Array(Math.round(props.userRating))].map((_, index) => (
                                    <div key={index} className="mask mask-star bg-yellow-400" aria-label={`${index + 1} star`}></div>
                                ))
                            }
                        </div>
                    } */}

                    </div>
                </div>

            </div>

        </div>
    )
}
