import { useQuery } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router"
import Ticket, { TicketProps } from "./Ticket"

async function getTicketDetails(ticket_id: string): Promise<TicketProps> {
  const response = await fetch(
    `http://localhost:8080/getTicketDetails/${ticket_id}`
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch ticket details`)
  }

  return response.json()
}

function TicketSkeleton() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-900 p-4 text-white shadow-lg">
      {/* Header */}
      <div className="flex gap-4 rounded-xl border border-gray-700 p-4">
        <div className="h-36 w-24 rounded-lg bg-gray-700 animate-pulse" />

        <div className="flex flex-col gap-3 flex-1">
          <div className="h-4 w-3/4 rounded bg-gray-700 animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-gray-700 animate-pulse" />
          <div className="h-3 w-full rounded bg-gray-700 animate-pulse" />
          <div className="h-3 w-2/3 rounded bg-gray-700 animate-pulse" />
          <div className="h-3 w-3/4 rounded bg-gray-700 animate-pulse" />
        </div>
      </div>

      {/* Perforation */}
      <div className="my-4 border-t border-dashed border-gray-600" />

      {/* QR Section */}
      <div className="flex items-center justify-between rounded-xl bg-gray-800 p-4">
        <div className="h-24 w-24 rounded-md bg-gray-700 animate-pulse" />

        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 rounded bg-gray-700 animate-pulse" />
          <div className="h-3 w-32 rounded bg-gray-700 animate-pulse" />
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 h-10 rounded bg-gray-700 animate-pulse" />
    </div>
  )
}

export default function TicketPageIndex() {
  const params = useParams()
  const { pathname } = useLocation()

  const { isLoading, isError, error, data } = useQuery<TicketProps>({
    queryKey: ["ticket_details", params.ticketID],
    queryFn: () => getTicketDetails(params.ticketID as string),
    enabled: !!params.ticketID,
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 p-4">
      {isLoading && <TicketSkeleton />}

      {isError && (
        <div className="w-full max-w-md rounded-2xl border border-gray-700 bg-gray-900 p-6 text-center text-red-500">
          Failed to load ticket
          <p className="mt-2 text-sm text-gray-400">
            {(error as Error).message}
          </p>
        </div>
      )}

      {data && (
        <Ticket
          bookingID={data.bookingID}
          cinemaName={data.cinemaName}
          date={data.date}
          format={data.format}
          imageURL={data.imageURL}
          language={data.language}
          movieTitle={data.movieTitle}
          screenNumber={data.screenNumber}
          qrCodeURL={pathname}
          seatNumbers={data.seatNumbers}
          showTime={data.showTime}
          venueName={data.venueName}
        />
      )}
    </div>
  )
}
