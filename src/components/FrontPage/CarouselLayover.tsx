import Title from "../../stories/Title"
import { SlCalender } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export interface CarouselLayoverProps {
  title?: string,
  genreTags?: string[],
  rating?: number,
  cast_crew: {
    name: string,
    character_name: string,
    photourl: string
  }[],
  summary?: string,
  releaseYear?: number,
  duration?: number // in milliseconds
  poster_url?: string
  screen_wide_poster_url?: string
  movie_id: number,
}

export default function CarouselLayover(props: CarouselLayoverProps) {
  const ratings = new Array();
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  for (let i = 0; i < (props.rating ?? 0); i++) {
    ratings.push(<div className="mask mask-star bg-orange-400" aria-label={(i + 1) + " star"}></div>);
  }

  function formatDuration(milliseconds: number) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} h ${minutes} m`;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center m-2 gap-4 w-full p-4">
      {/* Left Side */}
      <div className="flex flex-col items-start gap-4 p-2 w-full lg:w-2/3">
        <Title title={props.title || ""} />

        <div className="flex flex-wrap items-start gap-4 text-sm sm:text-base">
          <div>
            {props.genreTags?.map((val, idx) => (
              <span key={idx}>
                {val}{props.genreTags && idx !== props.genreTags.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <SlCalender className="text-yellow-400" />
            <span>{props.releaseYear}</span>
          </div>

          <div className="flex items-center gap-1">
            <FaRegClock className="text-yellow-400" />
            <span>{formatDuration(props.duration ?? 0)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rating">
            {ratings.map((val, idx) => (
              <div key={idx} className="mask mask-star bg-orange-200" aria-label={`${idx + 1} star`}>
                {val}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="btn btn-error" onClick={() => navigate(`movie/${props.movie_id}`)}>Book tickets</button>
            <button className="btn btn-soft btn-error" onClick={() => navigate(`movie/${props.movie_id}/reviews`)}>Review</button>
            <button className="btn btn-soft btn-error">More</button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      {/* <div className="flex flex-col gap-2 p-2 w-full lg:w-1/3 text-sm sm:text-base">
        <div className="flex flex-row flex-wrap gap-x-2 justify-start lg:justify-end">
          <p>{props.cast_crew.find(val => val.character_name === "Director")?.name}</p>
          <p className="text-yellow-500">: Director</p>
        </div>

        <div className="flex flex-wrap gap-x-2 justify-start lg:justify-end">
          {props.cast_crew.filter(val => val.character_name !== "Director").map((val, idx) => (
            <span key={idx}>{val.name}</span>
          ))}
          <p className="text-yellow-500">: Stars</p>
        </div>
        <div>
          <p className="line-clamp-3 text-justify break-words w-full lg:w-96">
            {props.summary}
          </p>
        </div>
      </div> */}
      <div className="flex flex-col gap-2 w-full lg:w-1/3 text-sm sm:text-base">
        {/* Director */}
        <div className="flex flex-wrap gap-x-2 justify-start lg:justify-end items-center">
          <p>{props.cast_crew.find(val => val.character_name === "Director")?.name}</p>
          <p className="text-yellow-500">: Director</p>
        </div>

        {/* Stars */}
        <div className="flex flex-wrap gap-x-2 justify-start lg:justify-end items-center">
          {props.cast_crew.filter(val => val.character_name !== "Director").map((val, idx) => (
            <span key={idx}>{val.name}</span>
          ))}
          <p className="text-yellow-500">: Stars</p>
        </div>

        {/* Summary */}
        <div className="lg:text-right">
          <p className="line-clamp-3 text-justify break-words w-full lg:max-w-[28rem]">
            {props.summary}
          </p>
        </div>
      </div>
    </div>
  );
}
