export interface MovieCardProps {
    rating: number // out of 5,
    imageURL: string,
    movie_id: number,
    movie_name: string,
    votes: number,
    comingSoon: boolean
}

export default function MovieCard(props: MovieCardProps) {

    const handleOnClick = () => {
        // Navigate to the details page
        // TODO: Need to be implemented
    }

    return (
        <div className="card bg-base-100 w-48 shadow-sm" onClick={handleOnClick}>
            <figure>
                <img
                    src={props.imageURL}
                    className="w-full" alt={`${props.movie_name} card poster`}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title w-fit gap-y-4 text-2xl">Fast X</h2>
                <div className="flex flex-row items-center justify-between">
                    {!props.comingSoon && <div className='flex flex-row gap-x-2 items-center'>
                        <div className="rating">
                            <div className="mask mask-star bg-orange-400" aria-label="1 star" aria-current="true"></div>
                        </div>
                        <p className="text-sm">{`${props.rating}/5`}</p>
                    </div>}
                    <div>
                        <p className="text-sm">
                            {props.votes !== undefined && props.votes >= 1000
                                ? `${(props.votes / 1000).toFixed(1)}k`
                                : `${props.votes}`} votes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

}
