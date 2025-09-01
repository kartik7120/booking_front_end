import { useLocation, useParams } from "react-router"
import SeatSelectionTop from "./SeatSelectionTop";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SeatMap, { Seat, SeatMatrix } from "./SeatMap";
import Legend from "./Legend";
import { useMemo, useState } from "react";
import { Movie } from "../HomePage/getNowPlayingMovies";
import { getVenueDetails } from "../SeatDetails/SeatSelection";

export interface BookedSeats {
  id?: number;
  seatNumber?: string;
  movieTimeSlotID?: number;
  seatMatrixID?: number;
  isBooked?: boolean;
}

export interface GetBookedSeats {
  status: number,
  message: string,
  booked_seats: BookedSeats[]
}

export interface GetSeatMatrix {
  status: number,
  message: string,
  seats: SeatMatrixType[]
}

export interface SeatMatrixType {
  seatNumber?: string;
  isBooked?: boolean;
  price?: number;
  row?: number;
  column?: number;
  type?: "FOUR_D" | "VIP" | "TWO_D" | "THREE_D";
  id?: number;
}

interface MovieTimeSlot {
  start_time: string;   // Format: "HH:MM:SS"
  end_time: string;     // Format: "HH:MM:SS"
  duration: number;     // Duration in minutes
  date: string;         // Format: "YYYY-MM-DD"
  movieid: number;
  venueid: number;
}

interface VenueDetails {
  name: string;
  address: string;
  rows: number;
  columns: number;
}


async function fetchGetBookedSeats({
  queryKey,
}: {
  queryKey: readonly unknown[];
}): Promise<GetBookedSeats> {
  try {

    if (!queryKey[1]) {
      throw new Error("Movie Time Slot ID is required");
    }

    console.log(`movie time slot id inside fetch function = ${queryKey}`)

    const response = await fetch("http://localhost:8080/GetBookedSeats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "movie_time_slot_id": Number(queryKey[1]) }),
    })

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }

    return response.json() as Promise<GetBookedSeats>;
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    throw error; // Rethrow the error to be handled by React Query
  }
}

async function GetSeatMatrix({
  queryKey,
}: {
  queryKey: readonly unknown[];
}): Promise<GetSeatMatrix> {
  try {

    if (!queryKey[1]) {
      throw new Error("Venue ID is required");
    }

    console.log(`venue id inside fetch function = ${queryKey}`)

    const response = await fetch("http://localhost:8080/GetSeatMatrix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "venue_id": Number(queryKey[1]) }),
    })

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json() as Promise<GetSeatMatrix>;
  } catch (error) {
    console.error("Error fetching seat matrix:", error);
    throw error; // Rethrow the error to be handled by React Query
  }
}

async function GetVenueDetails(venue_id: number | string) {
  const response = await fetch(`http://localhost:8080/getVenue/${venue_id}`)

  if (!response.ok) {
    throw new Error("error fetching get venues details ")
  }

  return response.json()
}

async function GetMovieTimeSlotDetails(movie_time_slot_id: string | undefined) {

  if (movie_time_slot_id === undefined) {
    throw new Error("movie time slot id cannot be undefined")
  }

  const response = await fetch(`http://localhost:8080/getMovieTimeSlot/${movie_time_slot_id}`)

  // if (!response.ok) {
  //   throw new Error("error requesting movie time slot details")
  // }

  return response.json()
}

function calculateNoOfRowsAndColumns(seats: SeatMatrixType[]): {
  row: number,
  column: number
} {
  let row = 0;
  let column = 0;

  for (let i = 0; i < seats.length; i++) {
    row = Math.max(row, seats[i].row || 0);
    column = Math.max(column, seats[i].column || 0);
  }

  return { row, column }
}

export default function Index() {
  const params = useParams();

  const { state } = useLocation();

  const queryClient = useQueryClient()

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [rowColumnMatrix, setRowColumnMatrix] = useState<SeatMatrix>({});

  const {
    data: getBookedSeats,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    isFetching,
    status,
    failureCount,
    isSuccess
  } = useQuery<GetBookedSeats>({
    queryKey: ['seatSelection', params.movieTimeSlotID],
    queryFn: ({ queryKey }) => fetchGetBookedSeats({ queryKey }),
    enabled: !!params.movieTimeSlotID, // prevent firing if 0 or NaN

  })

  const {
    data: getSeatMatrix,
    isLoading: isLoadingSeatMatrix,
    isError: isErrorSeatMatrix,
    error: errorSeatMatrix,
    refetch: refetchSeatMatrix,
    isRefetching: isRefetchingSeatMatrix,
    isFetching: isFetchingSeatMatrix,
    status: statusSeatMatrix,
    failureCount: failureCountSeatMatrix,
    isSuccess: isSuccessSeatMatrix
  } = useQuery<GetSeatMatrix>({
    queryKey: ['seatSelection', params.venueID],
    queryFn: ({ queryKey }) => GetSeatMatrix({ queryKey }),
    enabled: !!params.venueID
  })

  const {
    data: movieTimeSlotDetails,
    isError: movieTimeSlotDetailsIsError,
    error: movieTimeSlotDetailsError,
    isSuccess: movieTimeSlotDetailsSuccess
  } = useQuery<MovieTimeSlot>({
    queryKey: ["movie_time_slot_details", params.movieTimeSlotID],
    queryFn: () => GetMovieTimeSlotDetails(params.movieTimeSlotID),
    enabled: !!params.venueID
  })


  const {
    data: venueDetails,
    isError: venueDetailsIsError,
    error: venueDetailsError,
    isSuccess: venueDetailsIsSuccess
  } = useQuery<VenueDetails>({
    queryKey: ['venue', params.venueID],
    queryFn: () => getVenueDetails(params.venueID),
    enabled: !!params.venueID
  })

  // if (movieTimeSlotDetailsSuccess) {
  //   console.log("movie time slot details object: ", JSON.stringify(movieTimeSlotDetails))
  // }

  if (venueDetailsIsSuccess) {
    console.log(`venueDetails :`, venueDetails)
  }

  if (isError || isErrorSeatMatrix) {
    return <div>Error fetching seats</div>
  }
  const totalRows = useMemo(() => calculateNoOfRowsAndColumns(getSeatMatrix?.seats || []).row, [getSeatMatrix?.seats])
  const totalColumns = useMemo(() => calculateNoOfRowsAndColumns(getSeatMatrix?.seats || []).column, [getSeatMatrix?.seats])
  const movieDetails = queryClient.getQueryData<Movie>(["movieDetails", params.id])

  return (
    <div className="m-6 flex flex-col justify-between gap-y-6 h-full">
      <SeatSelectionTop
        movieName={
          movieDetails?.title || "N/A"
        }
        showDate={
          movieTimeSlotDetails?.date || "N/A"
        }
        showTime={
          movieTimeSlotDetails?.start_time || "N/A"
        }
        venueName={
          venueDetails?.name || "N/A"
        }
      />
      {/* <div>
        <SeatMap
          seats={{
            seatMap: getSeatMatrix?.seats?.map(
              (seat, index) => ({
                seat_number: seat.seatNumber || `Seat ${index + 1}`,
                price: seat.price || 0,
                row: seat.row || 0,
                column: seat.column || 0,
                type: seat.type || "TWO_D",
                id: seat.id || index,
              })
            ) || [],
            bookedSeats: getBookedSeats?.booked_seats?.map(
              (bookedSeat) => ({
                id: bookedSeat.id || 0,
                seat_number: bookedSeat.seatNumber || "Unknown",
                movieTimeSlotID: bookedSeat.movieTimeSlotID || 0,
                seatMatrixID: bookedSeat.seatMatrixID || 0,
                is_booked: bookedSeat.isBooked || false
              })
            ) || [],
            totalColumns: totalColumns,
            totalRows: totalRows
          }}
          rowColumnMatrix={rowColumnMatrix}
          selectedSeats={selectedSeats}
          setRowColumnMatrix={setRowColumnMatrix}
          setSelectSeatState={setSelectedSeats}
        />
      </div> */}
      <div className="justify-center items-center flex flex-col bottom-0">
        <Legend />
      </div>
    </div>
  )
}
