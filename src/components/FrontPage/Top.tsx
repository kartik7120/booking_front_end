import { useQuery, useQueryClient } from "@tanstack/react-query";
import Carousel, { CarouselProps } from "../Carousel";
import { CarouselLayoverProps } from "./CarouselLayover";
import { useEffect, useState } from "react";
import Header from "../Header";

export interface TopProps extends CarouselLayoverProps, CarouselProps {

}

interface UpcomingMovieResponse {
  title: string;
  duration: number; // in milliseconds
  release_date: number;
  poster_url: string;
  id: number;
  ranking: number;
  type: string[]
  summary: string;
  director: string;
  cast_crew: {
    name: string,
    character_name: string,
    photourl: string
  }[]
  // stars: {
  //   name: string;
  //   character_name: string;
  //   type: string;
  //   photourl: string;
  // }[];
}

export default function Top(props: TopProps) {

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, '0');
  const day = String(todayDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [width, setWidth] = useState<number>()
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  console.log("Formatted date:", formattedDate);

  const { data, error, isLoading, isSuccess } = useQuery<UpcomingMovieResponse[]>({
    queryKey: ['upcomingMovies'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/getupcomingmovies/${formattedDate}`);
      if (!res.ok) {
        const errorText = await res.text(); // Read the error message as text
        console.error("Server Error:", errorText);
        throw new Error(`Server responded with status ${res.status}: ${errorText}`);
      }
      return res.json();
    }
  })

  if (isLoading) {
    return <div className={`skeleton h-200 w-[${width}]`}></div>
  }

  if (error) {
    return <div className={`w-[${width}] h-200`}>
      <img src={`https://fakeimg.pl/${width}x${height}/1c1c1c/ffffff/?text=Please+Try+Again&font=lobster`} alt="placeholder image if no data is present to show in carousel" />
    </div>
  }

  if (isSuccess) {
    console.log(data);
  }

  return (
    <div className="w-full">
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div>
        {
          data === undefined || data === null || data?.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">No Movies Found</h1>
            </div>
          )
        }
        {
          data && data.length > 0 && (
            <Carousel
              imageURLs={
                props.imageURLs
              }
              shouldAutoScroll={props.shouldAutoScroll}
              scrollInterval={props.scrollInterval}
              CarouselLayoverProps={
                data?.map((movie) => ({
                  title: movie.title,
                  genreTags: movie.type,
                  rating: 0,
                  cast_crew: movie.cast_crew,
                  releaseYear: new Date(movie.release_date.toString().split(" ")[0]).getFullYear(),
                  summary: movie.summary,
                  duration: movie.duration,
                  stars: [""]
                })) || []
              }
            />
          )
        }
      </div>
    </div>
  )
}
