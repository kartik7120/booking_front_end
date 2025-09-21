import { useEffect, useMemo, useState } from 'react'
import Navbar from '../FrontPage/Navbar'
import Carousel from '../Carousel'
import { CarouselLayoverProps } from '../FrontPage/CarouselLayover';
import MovieCard from '../MovieCard';
import Stats from '../FrontPage/Stats';
import Footer from '../FrontPage/footer';
import { useQuery } from '@tanstack/react-query';
import { fetchNowPlayingMovies, getUpcomingMovies, IsTokenValid, Movie, UpcomingMovies } from './getNowPlayingMovies';
import { sortMovies } from '../../utils/util';
import Cookies from "js-cookie"
import useStore from '../../zustand/store';

export default function HomePage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [CarouselLayoverProps, useStateCarouselLayoverProps] = useState<CarouselLayoverProps[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState("")

  const reset = useStore(state => state.clearStore)

  const {
    isError: isErrorNowPlayingMovies,
    isLoading: isLoadingNowPlayingMovies,
    data: nowPlayingMovies
  } = useQuery<UpcomingMovies[]>({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchNowPlayingMovies,
    refetchOnWindowFocus: false,
  })

  const {
    isError: isErrorUpcomingMovies,
    isLoading: isLoadingUpcomingMovies,
    data: upcomingMoviesData
  } = useQuery<UpcomingMovies[]>({
    queryKey: ['upcomingMovies', { date: new Date().toISOString().split('T')[0] }],
    queryFn: getUpcomingMovies,
    refetchOnWindowFocus: false
  });

  useMemo(() => {
    if (!nowPlayingMovies || !upcomingMoviesData) return;
    const sortedMovies = sortMovies([...nowPlayingMovies, ...upcomingMoviesData]);

    // console.log(`Sorted Movies:`, sortedMovies);

    if (sortedMovies.length === 0) {
      useStateCarouselLayoverProps([]);
      return;
    }

    // Update the state with sorted movies
    useStateCarouselLayoverProps(sortedMovies.map(movie => ({
      title: movie.title,
      genreTags: movie.type,
      rating: movie.ranking,
      summary: movie.description,
      duration: movie.duration * 60000, // Convert minutes to milliseconds
      releaseYear: new Date(movie.release_date).getFullYear(),
      cast_crew: movie.cast_crew.map(crew => ({
        name: crew.name,
        character_name: crew.character_name,
        photourl: crew.photourl
      })),
      poster_url: movie.poster_url,
      screen_wide_poster_url: movie.screen_wide_poster_url
    })));
  }, [nowPlayingMovies, upcomingMoviesData]);

  useEffect(() => {
    // Reset store
    reset();
  }, [])

  return (
    <div>
      {/* <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
      <div className='m-2'>
        <Carousel isLoading={!(CarouselLayoverProps && CarouselLayoverProps.length > 0)} CarouselLayoverProps={
          CarouselLayoverProps
        }
          imageURLs={
            // [
            //   "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
            //   "https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg",
            //   "https://image.tmdb.org/t/p/w1280/9GAGg2k5b6d8c4a7e1f3b4f5f5f5.jpg",
            //   "https://image.tmdb.org/t/p/w1280/8X2k5b6d8c4a7e1f3b4f5f5f5f5.jpg",
            // ]
            CarouselLayoverProps.map(item => item.poster_url || "https://via.placeholder.com/1280x720")
            // TODO: map over screen_wide_poster_url if available
          }
          shouldAutoScroll={true}
          scrollInterval={5000}
        />
      </div>
      <div>
        {/* Now Playing cards section */}
        <h2 className='text-2xl h-2 font-bold my-4 p-4'>Now Playing Movies</h2>
        <div className='flex flex-row items-center flex-wrap gap-4 p-4'>
          {
            isLoadingNowPlayingMovies && <div className="skeleton h-96 w-full max-w-screen" />
          }
          {
            isErrorNowPlayingMovies && <div className="flex flex-col items-center justify-center w-full h-96">
              <p className="text-red-500">Error loading now playing movies</p>
              <p className="text-gray-500">Please try again later.</p>
            </div>
          }
          {
            nowPlayingMovies && nowPlayingMovies.length === 0 && <div className="flex flex-col items-center justify-center w-full h-96">
              <p className="text-gray-500">No movies currently playing.</p>
              <p className="text-gray-500">Check back later for updates.</p>
            </div>
          }
          {nowPlayingMovies && nowPlayingMovies.length > 0 && nowPlayingMovies.map((movieCard: Movie) => (
            <MovieCard
              key={movieCard.id}
              rating={movieCard.ranking}
              imageURL={movieCard.poster_url}
              movie_id={movieCard.id}
              movie_name={movieCard.title}
              votes={movieCard.votes}
              comingSoon={false}
            />
          ))}
        </div>
        <div className='divider'></div>
      </div>
      <div>
        {/* Upcoming card section */}
        <h2 className='text-2xl h-2 font-bold my-4 p-4'>Upcoming Movies</h2>
        <div className='flex flex-row items-center flex-wrap gap-4 p-4'>
          {
            isLoadingUpcomingMovies && <div className="skeleton h-96 w-full max-w-screen" />
          }
          {
            isErrorUpcomingMovies && <div className="flex flex-col items-center justify-center w-full h-96">
              <p className="text-red-500">Error loading upcoming movies</p>
              <p className="text-gray-500">Please try again later.</p>
            </div>
          }
          {
            upcomingMoviesData && upcomingMoviesData.length === 0 && <div className="flex flex-col items-center justify-center w-full h-96">
              <p className="text-gray-500">No upcoming movies available.</p>
              <p className="text-gray-500">Check back later for updates.</p>
            </div>
          }
          {upcomingMoviesData && upcomingMoviesData.length > 0 && upcomingMoviesData.map((movieCard: UpcomingMovies) => (
            <MovieCard
              comingSoon={true}
              imageURL={movieCard.poster_url}
              movie_id={movieCard.id}
              movie_name={movieCard.title}
              rating={movieCard.ranking}
              votes={movieCard.votes}
              key={movieCard.id}
            />
          ))}
        </div>
        <div className='divider'></div>
      </div>
      <div className='m-4'>
        <Stats />
      </div>
      <Footer />
    </div>
  )
}

/**
 * TODO: Impletement error handling for the queries - DONE
 * TODO: Add logic to flush the cookies when the user logs out or if token expires - DONE
 * TODO: Add navigation logic to navigate to the movie details page when a movie card is clicked
 * TODO: Add logic to handle the case when there are no movies in the now playing or upcoming sections - DONE
 * TODO: Add loading skeletons for the movie cards - DONE
 */