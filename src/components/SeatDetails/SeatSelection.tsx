import { MovieTimeSlotResponse } from "../MovieTimeSlots/Index";
import { Movie } from "../HomePage/getNowPlayingMovies";
import { SeatMatrix } from "../SeatSelection/SeatMap";
import { baseURL } from "../../App";

export enum VenueType {
    MOVIE = 0,
    CONCERT = 1,
    PLAY = 2,
    STANDUP = 3,
}

export interface Venue {
    name: string;
    address: string;
    type: VenueType;
    rows: number;
    columns: number;
    longitude: number;
    latitude: number;
    screenNumber: number;
    seats: SeatMatrix[];
    movieTimeSlots: MovieTimeSlotResponse["movie_time_slots"];
    movies: Movie[];
    id: number;
    movieFormatSupported: string[];
    languageSupported: string[];
}

export async function getVenueDetails(venueID: string | undefined) {

    if (venueID == undefined) {
        throw new Error("venueID undefined")
    }
    const response = await fetch(`${baseURL}/getVenue/${venueID}`)

    return response.json()
}

export async function getMovieTimeSlot(movieTimeSlotID: string | undefined) {

    if (movieTimeSlotID === undefined) {
        throw new Error("movie time slot is undefined")
    }

    const response = await fetch(`${baseURL}/getMovieTimeSlot/${movieTimeSlotID}`)

    return response.json()
}

export default function SeatSelection() {

    // const params = useParams()

    // const queryClient = useQueryClient()
    // const [error, setError] = useState("")

    // const { data: venueData, error: errorVenue, isError, isLoading } = useQuery<Venue>({
    //     queryKey: ['venue', params.venueID],
    //     queryFn: () => getVenueDetails(params.venueID),
    // })

    // const { data: movieTimeSlotData, error: movieTimeSlotError, isError: isMovieTimeSlotError } = useQuery<MovieTimeSlotResponse["movie_time_slots"][0]>({
    //     queryKey: ['movieTimeSlot', params.movieTimeSlotID],
    //     queryFn: () => getMovieTimeSlot(params.movieTimeSlotID)
    // })

    // const movieDetails = queryClient.getQueryData<Movie>(["movieDetails", params.id])

    // return (
    //     <div>
    //         {/* <SeatSelectionTop venueName={venueData?.name || "N/A"} movieName={movieDetails?.title || "N/A"} showDate={movieTimeSlotData?.date} showTime={movieTimeSlotData?.start_time} /> */}
    //     </div>
    // )
}
