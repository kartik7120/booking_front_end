import Title from "../../stories/Title"
import { SlCalender } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa6";
import { useEffect, useState } from "react";

export interface CarouselLayoverProps {
  title?: string,
  genreTags?: string[],
  rating?: number,
  cast_crew: {
    name: string,
    character_name: string,
    photourl: string
  }[]
  summary?: string,
  releaseYear?: number,
  duration?: number // in milliseconds
}

export default function CarouselLayover(props: CarouselLayoverProps) {

  const ratings = new Array();

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  // Set the width and height of the window

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    // Set initial size

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [width, height]);

  for (let i = 0; i < (props.rating ?? 0); i++) {
    ratings.push(<div className="mask mask-star bg-orange-400" aria-label={(i + 1) + " star"}></div>)
  }

  function formatDuration(milliseconds: number) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)); // Calculate hours
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)); // Calculate remaining minutes

    return `${hours} h ${minutes} m`;
  }

  return (
    <div className="flex flex-row justify-between items-center m-2 gap-x-3 w-full p-4">
      <div className="flex flex-col items-start gap-y-3 p-2">
        {/* Left side of Carousel Layover */}
        <Title title={props.title || ""} />
        <div className="flex flex-col items-start gap-y-3"> {/* This dev is used to hold tags, year and duration */}
          <div className="flex flex-row items-start gap-x-3">
            {/* genreTags */}
            <div>
              {props.genreTags && props.genreTags.length > 0 && props.genreTags.map((val, idx) => {
                if (idx !== (props.genreTags ?? []).length - 1) {
                  return <span key={idx}>{val + ", "}</span>
                } else {
                  return <span key={idx}>{val}</span>
                }
              })}
            </div>
            <div className="flex flex-row gap-x-2 items-center">
              {/* releaseYear with calender icon */}
              <SlCalender color="yellow" />
              <span>{props.releaseYear}</span>
            </div>
            <div className="flex flex-row gap-x-2 items-center">
              {/* duration of movie */}
              <FaRegClock color="yellow" />
              <span>
                {formatDuration(props.duration ?? 0)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-3">
            {/* Rating */}
            <div className="rating">
              {
                ratings.map((val, idx) => {
                  return <div className="mask mask-star bg-orange-200" aria-label={`${idx + 1} start`}>{val}</div>
                })
              }
            </div>
            <div className="flex flex-row gap-x-3 m-2">
              {/* Buttons */}
              <button className="btn btn-warning">Book tickets</button>
              <button className="btn btn-soft btn-warning">Review</button>
              <button className="btn btn-soft btn-warning">More</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 self-end p-2">
        {/* Right side of CarouselLayover*/}
        <div className="flex flex-row gap-x-2 justify-end xl:text-lg lg:text-md md:text-sm sm:text-xs">
          {/* Director name */}
          <p>{props.cast_crew.length && props.cast_crew.find((val) => val.character_name === "Director")?.name}</p>
          <p className="text-yellow-500">: Director</p>
        </div>
        <div className="flex flex-row gap-x-2 justify-end">
          <div className="flex flex-row gap-x-2">
            {
              props.cast_crew && props.cast_crew.map((val, idx) => {
                if (val.character_name !== "Director") {
                  return <span key={idx}>{val.name}</span>
                }
              })
            }
          </div>
          <p className="text-yellow-500">: Stars</p>
        </div>
        <div>
          <p className="line-clamp-3 justify-end text-justify break-words w-96">{props.summary}</p>
        </div>
      </div>
    </div>
  )
}
