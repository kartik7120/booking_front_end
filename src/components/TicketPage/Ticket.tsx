import { useRef } from "react";

export interface TicketProps {
    imageURL: string;      // Poster image URL
    movieTitle: string;
    cinemaName: string;
    showTime: string;
    seatNumbers: string[];
    bookingID: string;
    qrCodeURL: string;     // QR code image URL
    language: string;
    format: string;        // e.g., "2D", "3D", "IMAX"
    date: string;          // e.g., "2023-10-15"
    venueName: string;
    screenNumber: string;
}

export default function Ticket(props: TicketProps) {
    const ticketRef = useRef<HTMLDivElement>(null);

    function handlePrint() {
        if (!ticketRef.current) return;

        const element = ticketRef.current;
        const newWindow = window.open("", "_blank");
        if (!newWindow) return;

        // Create a container div in the new window
        const container = newWindow.document.createElement("div");
        container.innerHTML = element.innerHTML;

        // Apply styles to the new window
        const style = newWindow.document.createElement("style");
        style.textContent = `
    body {
      font-family: Arial, sans-serif;
      background-color: #1f2937;
      color: #ffffff;
      margin: 0;
      padding: 20px;
    }
    .ticket-container {
      max-width: 400px;
      border: 2px solid #4b5563;
      border-radius: 12px;
      padding: 16px;
      margin: 0 auto;
    }
    .ticket-header {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      border: 2px solid #4b5563;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
    }
    .poster { width: 96px; height: 144px; object-fit: cover; }
    .ticket-info { display: flex; flex-direction: column; gap: 12px; margin-left: 16px; }
    .perforation { width: 100%; border: 1px dashed #4b5563; margin-bottom: 12px; }
    .qr-section { display: flex; flex-direction: row; justify-content: space-evenly; align-items: center; background-color: #374151; padding: 16px; border-radius: 12px; margin-bottom: 12px; }
    .qr-section img { width: 100px; height: 100px; }
    .screen-info { display: flex; flex-direction: column; gap: 8px; }
    .instructions { font-size: 14px; }
    .no-print {
        display: none;
    }
  `;

        newWindow.document.head.appendChild(style);
        newWindow.document.body.appendChild(container);
        newWindow.document.body.classList.add("ticket-container");
        newWindow.focus();
        newWindow.print();
    }
    return (
        <div
            ref={ticketRef}
            style={{
                backgroundColor: "#1f2937",
                border: "2px solid #4b5563",
                color: "#ffffff",
                maxWidth: "400px",
                margin: "0 auto",
                padding: "16px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            {/* Ticket Header */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    border: "2px solid #4b5563",
                    borderRadius: "12px",
                    padding: "16px",
                }}
            >
                <div style={{ width: "96px", height: "144px", flexShrink: 0 }}>
                    <img
                        src={props.imageURL}
                        alt={`${props.movieTitle} Poster`}
                        crossOrigin="anonymous"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                <div style={{ marginLeft: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <p>{props.movieTitle}</p>
                    <p>{props.date} | {props.format}</p>
                    <p>{props.cinemaName} - {props.venueName}</p>
                    <p>Showtime: {props.showTime}</p>
                    <p>Seats: {props.seatNumbers.join(", ")}</p>
                    <p>Language: {props.language}</p>
                </div>
            </div>

            {/* Perforation line */}
            <div style={{ width: "100%", border: "1px dashed #4b5563" }}></div>

            {/* QR + Screen Info */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    backgroundColor: "#374151",
                    padding: "16px",
                    borderRadius: "12px",
                }}
            >
                <div>
                    <img src={props.qrCodeURL} alt="QR Code" crossOrigin="anonymous" style={{ width: "100px", height: "100px" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <p style={{ fontWeight: "bold", fontSize: "24px" }}>Screen {props.screenNumber}</p>
                    <p>Booking ID: {props.bookingID}</p>
                </div>
            </div>

            {/* Instructions */}
            <div>
                <p style={{ fontSize: "14px" }}>
                    Please arrive at least 15 minutes before the showtime. Enjoy your movie! You will receive an email confirmation with your booking details shortly.
                </p>
            </div>

            {/* Print button */}
            <div>
                <button
                    className="no-print"
                    onClick={handlePrint}
                    style={{
                        backgroundColor: "#dc2626",
                        color: "#ffffff",
                        fontWeight: "bold",
                        padding: "12px",
                        width: "100%",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    Print Ticket
                </button>
            </div>
        </div>
    );
}
