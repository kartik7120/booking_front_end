export interface MovieCardProps {
    rating: number; // out of 5
    imageURL: string;
    movie_id: number;
    movie_name: string;
    votes: number;
    comingSoon: boolean;
}

export default function MovieCard(props: MovieCardProps) {
    const handleOnClick = () => {
        // Navigate to the details page
        // TODO: Need to be implemented
    };

    return (
        <div
            className="card bg-base-100 w-48 sm:w-56 md:w-64 lg:w-72 shadow-sm hover:border hover:border-white cursor-pointer active:border active:border-purple-700"
            onClick={handleOnClick}
        >
            <figure>
                <img
                    src={props.imageURL}
                    className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
                    alt={`${props.movie_name} card poster`}
                />
            </figure>
            <div className="card-body p-2 sm:p-4">
                <h2 className="card-title w-fit gap-y-4 text-lg sm:text-xl md:text-2xl lg:text-3xl">
                    {props.movie_name}
                </h2>
                <div className="flex flex-row items-center justify-between">
                    {!props.comingSoon && (
                        <div className="flex flex-row gap-x-2 items-center">
                            <div className="rating">
                                <div
                                    className="mask mask-star bg-orange-400"
                                    aria-label="1 star"
                                    aria-current="true"
                                ></div>
                            </div>
                            <p className="text-xs sm:text-sm md:text-base">{`${props.rating}/5`}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-xs sm:text-sm md:text-base">
                            {props.votes !== undefined && props.votes >= 1000
                                ? `${(props.votes / 1000).toFixed(1)}k`
                                : `${props.votes}`}{" "}
                            votes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}