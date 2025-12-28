import { useRef } from "react"

export interface TicketProps {
    imageURL: string
    movieTitle: string
    cinemaName: string
    showTime: string
    seatNumbers: string[]
    bookingID: string
    qrCodeURL: string
    language: string
    format: string
    date: string
    venueName: string
    screenNumber: string
}

export default function Ticket(props: TicketProps) {
    const ticketRef = useRef<HTMLDivElement>(null)

    function handlePrint() {
        if (!ticketRef.current) return

        const printWindow = window.open("", "_blank")
        if (!printWindow) return

        printWindow.document.open()
        printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Movie Ticket</title>

        <!-- Tailwind CDN (needed for same layout) -->
        <script src="https://cdn.tailwindcss.com"></script>

        <style>
          body {
            background: #111827;
            margin: 0;
            padding: 24px;
            display: flex;
            justify-content: center;
          }

          /* Hide print button */
          .no-print {
            display: none !important;
          }

          /* Force ticket width */
          .ticket-print {
            max-width: 400px;
            width: 100%;
          }

          /* FIX IMAGE SIZES */
          img {
            max-width: 100%;
            height: auto;
          }

          /* Poster image */
          .poster {
            width: 96px !important;
            height: 144px !important;
            object-fit: cover !important;
          }

          /* QR image */
          .qr {
            width: 96px !important;
            height: 96px !important;
          }

          @media print {
            body {
              background: white;
              padding: 0;
            }

            .ticket-print {
              border: none;
              box-shadow: none;
            }
          }
        </style>
      </head>

      <body>
        <div class="ticket-print">
          ${ticketRef.current.innerHTML}
        </div>
      </body>
    </html>
  `)

        printWindow.document.close()
        printWindow.focus()

        // Give Tailwind time to load
        setTimeout(() => {
            printWindow.print()
            printWindow.close()
        }, 500)
    }

    return (
        <div
            ref={ticketRef}
            className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 text-white shadow-lg"
        >

            {/* Ticket side cutouts */}
            {/* <div className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-gray-800" />
      <div className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-gray-800" /> */}

            {/* Header */}
            <div className="flex gap-4 p-4">
                <img
                    src={props.imageURL}
                    alt={props.movieTitle}
                    crossOrigin="anonymous"
                    className="poster h-36 w-24 rounded-lg object-cover"
                />

                <div className="flex flex-col gap-1 text-sm">
                    <h2 className="text-lg font-bold">{props.movieTitle}</h2>
                    <p className="text-gray-300">
                        {props.date} • {props.format}
                    </p>
                    <p>
                        {props.cinemaName} – {props.venueName}
                    </p>
                    <p>Showtime: {props.showTime}</p>
                    <p>Seats: {props.seatNumbers.join(", ")}</p>
                    <p>Language: {props.language}</p>
                </div>
            </div>

            {/* Perforation line */}
            <div className="border-t border-dashed border-gray-600 mx-4 my-2" />

            {/* QR Section */}
            <div className="mx-4 my-4 flex items-center justify-between rounded-xl bg-gray-800 p-4">
                <img
                    src={props.qrCodeURL}
                    alt="QR Code"
                    crossOrigin="anonymous"
                    className="qr h-24 w-24 rounded-md"
                />

                <div className="text-right">
                    <p className="text-2xl font-bold">
                        Screen {props.screenNumber}
                    </p>
                    <p className="text-xs text-gray-400">Booking ID</p>
                    <p className="font-mono text-sm">
                        {props.bookingID}
                    </p>
                </div>
            </div>

            {/* Instructions */}
            <p className="px-4 pb-4 text-xs text-gray-300">
                Please arrive at least 15 minutes before the showtime.
                Enjoy your movie! 🎬
            </p>

            {/* Print Button */}
            <div className="px-4 pb-4">
                <button
                    onClick={handlePrint}
                    className="no-print w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50"
                >
                    Print Ticket
                </button>
            </div>
        </div>
    )
}
