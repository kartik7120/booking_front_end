import React, { useState } from 'react'
import Navbar from '../FrontPage/Navbar'
import Carousel, { CarouselProps } from '../Carousel'
import { CarouselLayoverProps } from '../FrontPage/CarouselLayover';
import MovieCard, { MovieCardProps } from '../MovieCard';
import Stats from '../FrontPage/Stats';
import Footer from '../FrontPage/footer';
import { useQuery } from '@tanstack/react-query';
import { fetchNowPlayingMovies, getUpcomingMovies } from './getNowPlayingMovies';

export default function HomePage() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [CarouselLayoverProps, useStateCarouselLayoverProps] = useState<CarouselLayoverProps[]>(
    [
      {
        title: "The Batman",
        genreTags: ["Action", "Sci-fi"],
        rating: 3,
        summary: "bwhevruwvghuirhwyghwrignjuiwrnguirwnguirnwgunruignwuhgirwnguirnwgubnwrigbhwbrgyu",
        duration: 4500000,
        releaseYear: 2008,
        cast_crew: [
          {
            "name": "Robert Pattinson",
            "character_name": "Bruce Wayne / Batman",
            "photourl": "https://example.com/robert_pattinson.jpg"
          },
          {
            "name": "Zoë Kravitz",
            "character_name": "Selina Kyle / Catwoman",
            "photourl": "https://example.com/zoe_kravitz.jpg"
          },
          {
            "name": "Paul Dano",
            "character_name": "Edward Nashton / Riddler",
            "photourl": "https://example.com/paul_dano.jpg"
          },
          {
            "name": "Matt Reeves",
            "character_name": "Director",
            "photourl": "https://example.com/matt_reeves.jpg"
          }
        ]
      },
      {
        title: "Interstellar",
        genreTags: ["Sci-fi", "Drama"],
        rating: 4,
        summary: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        duration: 7200000,
        releaseYear: 2014,
        cast_crew: [
          {
            "name": "Ryan Gosling",
            "character_name": "K",
            "photourl": "https://example.com/ryan_gosling.jpg"
          },
          {
            "name": "Harrison Ford",
            "character_name": "Rick Deckard",
            "photourl": "https://example.com/harrison_ford.jpg"
          },
          {
            "name": "Ana de Armas",
            "character_name": "Joi",
            "photourl": "https://example.com/ana_de_armas.jpg"
          },
          {
            "name": "Denis Villeneuve",
            "character_name": "Director",
            "photourl": "https://example.com/denis_villeneuve.jpg"
          }
        ]
      }
    ],
  );

  const {
    isError: isErrorNowPlayingMovies,
    isLoading: isLoadingNowPlayingMovies,
    data: nowPlayingMovies
  } = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: fetchNowPlayingMovies,
    refetchOnWindowFocus: false,
  })

  const {
    isError: isErrorUpcomingMovies,
    isLoading: isLoadingUpcomingMovies,
    data: upcomingMoviesData
  } = useQuery({
    queryKey: ['upcomingMovies', { date: new Date().toISOString().split('T')[0] }],
    queryFn: getUpcomingMovies,
    refetchOnWindowFocus: false
  });

  const [movieCards, setMovieCards] = useState<MovieCardProps[]>([{
    rating: 4.5,
    imageURL: "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    movie_id: 1,
    movie_name: "Inception",
    votes: 1500,
    comingSoon: false
  },
  {
    rating: 4.0,
    imageURL: "https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg",
    movie_id: 2,
    movie_name: "The Dark Knight",
    votes: 2000,
    comingSoon: false
  },
  {
    rating: 3.5,
    imageURL: "https://image.tmdb.org/t/p/w1280/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    movie_id: 3,
    movie_name: "Interstellar",
    votes: 1200,
    comingSoon: false
  }
  ]);

  const [upcomingMovies, setUpcomingMovies] = useState<MovieCardProps[]>([{
    rating: 0,
    imageURL: "https://image.tmdb.org/t/p/w1280/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    movie_id: 4,
    movie_name: "Dune Part Two",
    votes: 0,
    comingSoon: true
  },
  {
    rating: 0,
    imageURL: "https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg",
    movie_id: 5,
    movie_name: "Avatar 3",
    votes: 0,
    comingSoon: true
  },
  {
    rating: 0,
    imageURL: "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    movie_id: 6,
    movie_name: "Guardians of the Galaxy Vol. 3",
    votes: 0,
    comingSoon: true
  },
  {
    movie_name: "Mission: Impossible 7",
    movie_id: 7,
    imageURL: "https://image.tmdb.org/t/p/w1280/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    rating: 0,
    votes: 0,
    comingSoon: true
  }])

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className='m-2'>
        <Carousel isLoading={true} CarouselLayoverProps={
          CarouselLayoverProps
        }
          imageURLs={
            [
              "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
              "https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg"
            ]
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
            isErrorNowPlayingMovies && <div className="text-red-500">Error loading now playing movies</div>
          }
          {nowPlayingMovies && nowPlayingMovies.length > 0 && nowPlayingMovies.map((movieCard: MovieCardProps) => (
            <MovieCard
              key={movieCard.movie_id}
              rating={movieCard.rating}
              imageURL={movieCard.imageURL}
              movie_id={movieCard.movie_id}
              movie_name={movieCard.movie_name}
              votes={movieCard.votes}
              comingSoon={movieCard.comingSoon}
            />
          ))}

          {/* {nowPlayingMovies && movieCards.map((movieCard) => (
            <MovieCard
              key={movieCard.movie_id}
              rating={movieCard.rating}
              imageURL={movieCard.imageURL}
              movie_id={movieCard.movie_id}
              movie_name={movieCard.movie_name}
              votes={movieCard.votes}
              comingSoon={movieCard.comingSoon}
            />
          ))} */}
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
            isErrorUpcomingMovies && <div className="text-red-500">Error loading upcoming movies</div>
          }
          {upcomingMoviesData && upcomingMoviesData.length > 0 && upcomingMoviesData.map((movieCard: MovieCardProps) => (
            <MovieCard
              key={movieCard.movie_id}
              rating={movieCard.rating}
              imageURL={movieCard.imageURL}
              movie_id={movieCard.movie_id}
              movie_name={movieCard.movie_name}
              votes={movieCard.votes}
              comingSoon={true}
            />
          ))}
          {/* {upcomingMovies.map((movieCard) => (
            <MovieCard
              key={movieCard.movie_id}
              rating={movieCard.rating}
              imageURL={movieCard.imageURL}
              movie_id={movieCard.movie_id}
              movie_name={movieCard.movie_name}
              votes={movieCard.votes}
              comingSoon={movieCard.comingSoon}
            />
          ))} */}
        </div>
        <div className='divider'></div>
      </div>
      <Stats />
      <Footer />
    </div>
  )
}
