import { useNavigate, useParams } from "react-router"
import SeatSelectionTop from "./SeatSelectionTop";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SeatMap, { SeatMatrix } from "./SeatMap";
import type { SeatType as Seat } from "./SeatMap";
import Legend from "./Legend";
import { FormEvent, useMemo, useState } from "react";
import { Movie } from "../HomePage/getNowPlayingMovies";
import { getVenueDetails } from "../SeatDetails/SeatSelection";
import CurvedTheatreScreen from "../MovieTimeSlots/CurvedTheatreScreen";
import useStore from "../../zustand/store";
import { baseURL } from "../../App";

export interface BookedSeats {
  id?: number;
  seat_number?: string;
  movieTimeSlotID?: number;
  seatMatrixID?: number;
  is_booked: boolean;
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
  seat_number?: string;
  isBooked?: boolean;
  price?: number;
  row?: number;
  column?: number;
  type?: "FOUR_D" | "VIP" | "TWO_D" | "THREE_D";
  id?: number;
}

function isGetBookedSeats(data: unknown): data is BookedSeats[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "is_booked" in item &&
        typeof (item as any).is_booked === "boolean"
    )
  );
}

async function fetchGetBookedSeats({
  queryKey,
}: {
  queryKey: readonly unknown[];
}): Promise<BookedSeats> {
  try {

    if (!queryKey[1]) {
      throw new Error("Movie Time Slot ID is required");
    }

    // console.log(`movie time slot id inside fetch function = ${queryKey}`)

    const response = await fetch(`${baseURL}/GetBookedSeats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "movie_time_slot_id": Number(queryKey[1]) }),
    })

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }

    return response.json() as Promise<BookedSeats>;
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

    // console.log(`venue id inside fetch function = ${queryKey}`)

    const response = await fetch(`${baseURL}/GetSeatMatrix`, {
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

// async function GetVenueDetails(venue_id: number | string) {
//   const response = await fetch(`${baseURL}/getVenue/${venue_id}`)

//   if (!response.ok) {
//     throw new Error("error fetching get venues details ")
//   }

//   return response.json()
// }

async function GetMovieTimeSlotDetails(movie_time_slot_id: string | undefined) {

  if (movie_time_slot_id === undefined) {
    throw new Error("movie time slot id cannot be undefined")
  }

  const response = await fetch(`${baseURL}/getMovieTimeSlot/${movie_time_slot_id}`)

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

  // console.log(`total number of rows and column: ${row} and ${column}`)

  return { row, column }
}

interface CreateOrderRequestParams {
  idempotent_key: string;
  movie_id: number;
  movie_time_slot_id: number;
  venue_id: number;
  seatMatrixIDs: number[];
}

export async function CreateOrder({
  idempotent_key,
  movie_id,
  movie_time_slot_id,
  venue_id,
  seatMatrixIDs
}: CreateOrderRequestParams): Promise<{ error: string } | { order_id: string }> {

  const response = await fetch(`${baseURL}/createOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idempotent_key,
      movie_id,
      movie_time_slot_id,
      venue_id,
      seatMatrixIDs
    }),
  })

  return response.json()
}

export default function Index() {
  const params = useParams();
  const queryClient = useQueryClient();

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [rowColumnMatrix, setRowColumnMatrix] = useState<SeatMatrix>({});

  const navigate = useNavigate()

  const store = useStore()
  const idempotentKey = useStore((state) => state.idempotencyKey)
  const setMovieInStore = useStore((state) => state.setMovieID)
  const setMovieTimeSlotInStore = useStore((state) => state.setMovieTimeSlotID)
  const setVenueInStore = useStore((state) => state.setVenueID)
  const addSelectedSeatsToStore = useStore((state) => state.setSelectedSeatsID)
  const setOrderID = useStore((state) => state.setOrderID)

  // console.log(`idempotent key in seat selection index: ${idempotentKey}`)
  const {
    data: getBookedSeats,
    isLoading: isLoadingBookedSeats,
    isError: isErrorBookedSeats,
    isSuccess: isSuccessBookedSeats,
  } = useQuery({
    queryKey: ['seatSelection', params.movieTimeSlotID],
    queryFn: ({ queryKey }) => fetchGetBookedSeats({ queryKey }),
    enabled: !!params.movieTimeSlotID,
  });

  const {
    data: getSeatMatrix,
    isLoading: isLoadingSeatMatrix,
    isError: isErrorSeatMatrix,
    isSuccess: isSuccessSeatMatrix,
  } = useQuery({
    queryKey: ['seatSelection', params.venueID],
    queryFn: ({ queryKey }) => GetSeatMatrix({ queryKey }),
    enabled: !!params.venueID,
  });

  const {
    data: movieTimeSlotDetails,
    isLoading: isLoadingMovieTimeSlot,
  } = useQuery({
    queryKey: ["movie_time_slot_details", params.movieTimeSlotID],
    queryFn: () => GetMovieTimeSlotDetails(params.movieTimeSlotID),
    enabled: !!params.venueID,
  });

  const {
    data: venueDetails,
    isLoading: isLoadingVenueDetails,
  } = useQuery({
    queryKey: ['venue', params.venueID],
    queryFn: () => getVenueDetails(params.venueID),
    enabled: !!params.venueID,
  });

  const { mutate: CreateOrderMutate, isPending } = useMutation({
    mutationKey: ['createOrder', idempotentKey],
    mutationFn: () => {

      console.log(`booked seats = ${JSON.stringify(getBookedSeats)}`)
      console.log(`seat matrix data : ${JSON.stringify(getSeatMatrix)}`)


      console.log(`object send when calling create order function : ${JSON.stringify({
        idempotent_key: idempotentKey || "",
        movie_id: Number(params.id),
        movie_time_slot_id: Number(params.movieTimeSlotID),
        venue_id: Number(params.venueID),
        seatMatrixIDs: selectedSeats.map((seat) => seat.id)
      })}`)

      return CreateOrder({
        idempotent_key: idempotentKey || "",
        movie_id: Number(params.id),
        movie_time_slot_id: Number(params.movieTimeSlotID),
        venue_id: Number(params.venueID),
        seatMatrixIDs: selectedSeats.map((seat) => seat.id)
      })
    },
    onSuccess: (data) => {
      console.log(`data received after creating order: ${JSON.stringify(data)}`)
      if ('order_id' in data) {
        // Set the order id in the zustand store
        setOrderID(data.order_id)
        console.log(`order id received after creating order: ${data.order_id}`)
        // navigate to the contact details page
        navigate(`/confirmOrder/${data.order_id}`)

      } else if ('error' in data) {
        alert(`Error creating order: ${data.error}`)
        console.error(`error creating order: ${data.error}`)
      }
    },
  })

  const movieDetails = queryClient.getQueryData<Movie>(["movieDetails", params.id]);

  const totalRows = useMemo(() => calculateNoOfRowsAndColumns(getSeatMatrix?.seats || []).row, [getSeatMatrix?.seats]);
  const totalColumns = useMemo(() => calculateNoOfRowsAndColumns(getSeatMatrix?.seats || []).column, [getSeatMatrix?.seats]);

  const bookedSeatsData = isGetBookedSeats(getBookedSeats)
    ? getBookedSeats.map((bookedSeat) => ({
      id: bookedSeat.id ?? 0,
      seat_number: bookedSeat.seat_number ?? "Unknown",
      movieTimeSlotID: bookedSeat.movieTimeSlotID ?? 0,
      seatMatrixID: bookedSeat.seatMatrixID ?? 0,
      is_booked: bookedSeat.is_booked ?? false,
    }))
    : [];

  if (isErrorBookedSeats || isErrorSeatMatrix) {
    return <div className="text-red-500 text-center">Error fetching seat data.</div>;
  }

  function handleConfirmSeats(e: FormEvent<HTMLButtonElement>) {

    e.preventDefault()

    // Add details from the zustand store and navigate

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to proceed")
      return
    }

    addSelectedSeatsToStore(selectedSeats.map((seat) => seat.id.toString()))
    // Also need to add price legend

    if (params.id && store.movieID !== Number(params.id)) {
      setMovieInStore(Number(params.id))
    }

    if (params.movieTimeSlotID && store.movieTimeSlotID !== Number(params.movieTimeSlotID)) {
      setMovieTimeSlotInStore(Number(params.movieTimeSlotID))
    }

    if (params.venueID && store.venueID !== Number(params.venueID)) {
      setVenueInStore(Number(params.venueID))
    }

    CreateOrderMutate()

    // Call the order creation API endpoint to create order and navigate to contact details page after setting the order id in the zustand store
  }

  return (
    <div className="m-6 flex flex-col justify-between gap-y-6 h-full">
      {/* SeatSelectionTop */}
      <div>
        {isLoadingVenueDetails || isLoadingMovieTimeSlot ? (
          <div className="text-center text-gray-500 animate-pulse">Loading show details...</div>
        ) : (
          <SeatSelectionTop
            movieName={movieDetails?.title || "N/A"}
            showDate={movieTimeSlotDetails?.date || "N/A"}
            showTime={movieTimeSlotDetails?.start_time || "N/A"}
            venueName={venueDetails?.name || "N/A"}
          />
        )}
      </div>

      {/* SeatMap */}
      <div className="flex flex-col items-center justify-center w-full">

        {/* Theatre Screen */}
        <div className="flex justify-center mb-6">
          <CurvedTheatreScreen />
        </div>

        {/* Seat Map */}
        <div className="flex justify-center w-full overflow-x-auto">
          {isLoadingBookedSeats || isLoadingSeatMatrix ? (
            <div className="text-center text-gray-500 animate-pulse">
              Loading seat map...
            </div>
          ) : (
            isSuccessBookedSeats &&
            isSuccessSeatMatrix &&
            totalRows &&
            totalColumns && (
              <SeatMap
                seats={{
                  seatMap:
                    getSeatMatrix?.seats?.map((seat, index) => ({
                      seat_number: seat.seat_number || "",
                      price: seat.price || 0,
                      row: seat.row || 0,
                      column: seat.column || 0,
                      type: seat.type || "TWO_D",
                      id: seat.id || index,
                    })) || [],
                  bookedSeats: bookedSeatsData,
                  totalColumns,
                  totalRows,
                }}
                rowColumnMatrix={rowColumnMatrix}
                selectedSeats={selectedSeats}
                setRowColumnMatrix={setRowColumnMatrix}
                setSelectSeatState={setSelectedSeats}
              />
            )
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="justify-center items-center flex flex-col bottom-0">
        {isLoadingSeatMatrix ? (
          <div className="text-gray-500 animate-pulse">Loading legend...</div>
        ) : (
          <Legend />
        )}
      </div>

      {
        selectedSeats && selectedSeats.length > 0 &&
        <div>
          <button className={`btn btn-error w-full`} disabled={isPending} onClick={handleConfirmSeats}>
            {isPending && <span className="loading loading-spinner"></span>}
            Confirm seats
          </button>
        </div>
      }
      {
        selectedSeats && selectedSeats.length <= 0 && <div className="btn btn-error opacity-0">
          Confirm seats
        </div>
      }
    </div>
  );
}
