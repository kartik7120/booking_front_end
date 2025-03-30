import MovieCard, { MovieCardProps } from '../MovieCard'

export interface MiddleProps {
    NowPlayingMovies: MovieCardProps[],
    Trending: MovieCardProps[]
}

export default function Middle(props: MiddleProps) {
    return (
        <div>
            <div>
                <h2 className='text-3xl'>Now Playing</h2>
                <div className='flex flex-row flex-wrap items-center gap-7 p-6'>
                    {
                        props.NowPlayingMovies.map((val, idx) => {
                            return <MovieCard imageURL={val.imageURL} movie_id={val.movie_id}
                                movie_name={val.movie_name} rating={val.rating} votes={val.votes} key={idx} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
