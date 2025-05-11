import { useQuery } from "@tanstack/react-query";
import MovieTimeSlotDate from "./MovieTimeSlotDate";
import { useEffect, useState } from "react";
import TimeSlot from "./timeSlot";
import { useLocation, useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbBrandGoogleMaps } from "react-icons/tb";

export interface MovieTimeSlotRequest {
  start_date: string
  end_date: string
  movie_id: number
  longitude: number
  latitude: number
}

export async function FetchMovieTimeSlot(params: MovieTimeSlotRequest) {
  const response = await fetch("http://localhost:8080/getMovieTimeSlots", {
    body: JSON.stringify(params),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response.json();
}

export interface MovieTimeSlotResponse {
  status: number,
  message: string,
  movie_time_slots: {
    start_time: string
    end_time: string
    duration: number,
    date: string,
    movieid: number,
    venueid: number
  }[],
  venues: {
    name: string,
    address: string,
    rows: number,
    column: number,
    longitude: number,
    latitude: number,
    screen_number: number,
    id: number,
    movie_format_supported: string[],
    language_supported: string[]
  }[]
}

function MapVenueIdToTheirMovieTimeSlots(venues: MovieTimeSlotResponse["venues"], movie_time_slots: MovieTimeSlotResponse["movie_time_slots"]) {
  // a 2d array with 1d array as venue name and 2d array as movie time slots

  const result: [string, MovieTimeSlotResponse["movie_time_slots"]][] = [];

  for (let i = 0; i < venues.length; i++) {
    const venue = venues[i];
    const movie_time_slot = movie_time_slots.filter((movie_time_slot) => movie_time_slot.venueid === venue.id);
    result.push([venue.name, movie_time_slot]);
  }

  return result;
}

function generateDateRange(startDate: Date, endDate: Date) {
  const dateArray: string[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateArray.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

export default function Index() {

  const [start_date, setStart_date] = useState<string>("2025-04-05")
  const [end_date, setEnd_date] = useState<string>("2025-04-06")
  const [movie_id, setMovie_id] = useState<number>(1)
  const [longitude, setLongitude] = useState<number>(-122.4194)
  const [latitude, setLatitude] = useState<number>(37.7749)
  const [selectedDate, setSelectedDate] = useState<string>("2025-04-06")

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const date = new Date("2025-04-06");
    const start_date = date.toISOString().split("T")[0];
    const end_date = new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    setStart_date(start_date);
    setEnd_date(end_date);

    // Get the movie id from the url

    // navigator.geolocation.getCurrentPosition((position) => {
    //   setLongitude(position.coords.longitude);
    //   setLatitude(position.coords.latitude);
    // });

    // selected Date by default is today
  }, [])

  const { data, isSuccess, error, isError, isLoading } = useQuery<MovieTimeSlotResponse>({
    queryKey: ["getMovieTimeSlots", {
      start_date,
      end_date,
      latitude,
      longitude,
      movie_id
    } as MovieTimeSlotRequest],
    queryFn: ({ queryKey }) => FetchMovieTimeSlot(queryKey[1] as MovieTimeSlotRequest)
  });

  // if (isLoading) {
  //   return <div>
  //     {
  //       isLoading && Array.from({ length: 2 }).map((_, idx) => (
  //         <MovieTimeSlotDate isLoading={true} key={idx} date={""} available={false} />
  //       ))
  //     }
  //   </div>
  // }

  if (isError) {
    console.error(error)
    return <div>
      Error loading dates
    </div>
  }

  return (
    <div>
      {/* Need to add movie details as to what movie is selected */}
      <div className="flex flex-col gap-y-4 mb-4">
        <div className="flex flex-row items-center gap-x-3 mb-4">
          <button className="btn bg-gray-700" onClick={() => {
            // go to previous page
            navigate(-1);
          }}>
            <IoMdArrowRoundBack size={24} />
          </button>
        </div>
        <div>
          {/* Movie details */}
          <h1 className="text-3xl font-bold">{state.movie_name} - ({state.movie_language})</h1>
          {
            state.tags && state.tags.length > 0 && (
              <div className="flex flex-row gap-x-2 mt-2">
                {
                  state.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="bg-gray-700 text-white px-2 py-1 rounded-full">{tag}</span>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row items-center gap-x-3">
          {
            // Start a loop for the between start and end date and show the venues and movietimeslots based on the timeslot clicked
            // If no timeslot is available for a date then set available to false
            generateDateRange(new Date(start_date), new Date(end_date)).map((date, idx) => (
              <MovieTimeSlotDate
                key={idx}
                date={date}
                available={
                  isSuccess && data && data.movie_time_slots.filter((movie_time_slot) => movie_time_slot.date === date).length > 0
                }
                isLoading={isLoading}
                onClick={() => {
                  console.log("Clicked on date: ", date);
                  setSelectedDate(date);
                }}
              />
            ))
          }
        </div>
        <div className="divider"></div>
        {/* Show the venues and timeslots based the selected date */}
        <div className="flex flex-col gap-y-4">
          {
            isSuccess && data && MapVenueIdToTheirMovieTimeSlots(data.venues, data.movie_time_slots).map(([venueName, movieTimeSlots], idx) => (
              // Only show the venues that have movie time slots available for the selected date
              movieTimeSlots.filter((movieTimeSlot) => movieTimeSlot.date === selectedDate).length > 0 && (
                <div className="flex flex-row items-center justify-between gap-x-4 p-4 bg-gray-700 rounded-lg shadow-md flex-wrap" key={idx}>
                  <div key={idx} className="flex flex-col gap-y-2">
                    <h2 className="text-2xl font-bold">{venueName}</h2>
                    <div className="flex flex-row gap-x-3">
                      {
                        movieTimeSlots.filter((movieTimeSlot) => movieTimeSlot.date === selectedDate).map((movieTimeSlot, idx) => (
                          <TimeSlot
                            key={idx}
                            time={movieTimeSlot.start_time}
                          />
                        ))
                      }
                    </div>
                  </div>
                  <div className="tooltip tooltip-left" data-tip="Google map location link">
                    <button className="btn bg-gray-700" onClick={() => {
                      // Open google maps with the venue location
                      window.open(`https://www.google.com/maps/search/?api=1&query=${data.venues.filter((venue) => venue.name === venueName)[0].latitude},${data.venues.filter((venue) => venue.name === venueName)[0].longitude}`, "_blank");
                    }}>
                      <TbBrandGoogleMaps />
                    </button>
                  </div>
                </div>
              )
            ))
          }
          {
            isSuccess && data && MapVenueIdToTheirMovieTimeSlots(data.venues, data.movie_time_slots).map(([_, movieTimeSlots], idx) => (
              movieTimeSlots.filter((movieTimeSlot) => movieTimeSlot.date === selectedDate).length === 0 && (
                <div className="flex flex-row items-center justify-between gap-x-4 p-4 bg-gray-700 rounded-lg shadow-md flex-wrap">
                  <div key={0} className="flex flex-col gap-y-2">
                    <h2 className="text-2xl font-bold">No movie time slots available</h2>
                  </div>
                </div>
              )
            ))
          }
          {
            isSuccess && data && MapVenueIdToTheirMovieTimeSlots(data.venues, data.movie_time_slots).length === 0 && (
              <div className="flex flex-row items-center justify-between gap-x-4 p-4 bg-gray-700 rounded-lg shadow-md flex-wrap">
                <div key={0} className="flex flex-col gap-y-2">
                  <h2 className="text-2xl font-bold">No movie time slots available</h2>
                </div>
              </div>
            )
          }
        </div>
      </div >
    </div >
  )
}
