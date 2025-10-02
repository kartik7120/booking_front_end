import { useQuery } from "@tanstack/react-query";
import Ticket, { TicketProps } from "./Ticket";
import { useLocation, useParams } from "react-router";

async function getTicketDetails(ticket_id: string): Promise<TicketProps> {
  const response = await fetch(`http://localhost:8080/getTicketDetails/${ticket_id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ticket details: ${response.statusText}`);
  }
  return response.json();
}

function TicketSkeleton() {
  return (
    <div
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
      {/* Header */}
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
        <div style={{ width: "96px", height: "144px", backgroundColor: "#374151", borderRadius: "8px" }} />
        <div style={{ marginLeft: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ width: "150px", height: "16px", backgroundColor: "#374151", borderRadius: "4px" }} />
          <div style={{ width: "100px", height: "14px", backgroundColor: "#374151", borderRadius: "4px" }} />
          <div style={{ width: "180px", height: "14px", backgroundColor: "#374151", borderRadius: "4px" }} />
          <div style={{ width: "120px", height: "14px", backgroundColor: "#374151", borderRadius: "4px" }} />
          <div style={{ width: "140px", height: "14px", backgroundColor: "#374151", borderRadius: "4px" }} />
        </div>
      </div>

      {/* Perforation */}
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
        <div style={{ width: "100px", height: "100px", backgroundColor: "#1f2937", borderRadius: "8px" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ width: "80px", height: "16px", backgroundColor: "#1f2937", borderRadius: "4px" }} />
          <div style={{ width: "120px", height: "14px", backgroundColor: "#1f2937", borderRadius: "4px" }} />
        </div>
      </div>

      {/* Instructions placeholder */}
      <div style={{ width: "100%", height: "40px", backgroundColor: "#374151", borderRadius: "8px" }} />
    </div>
  );
}

export default function TicketPageIndex() {
  const params = useParams();
  const { pathname } = useLocation();

  const { isLoading, isError, error, data } = useQuery<TicketProps>({
    queryKey: ["ticket_details", params.ticketID],
    queryFn: () => getTicketDetails(params.ticketID as string),
    enabled: !!params.ticketID,
  });

  if (isLoading) {
    return <TicketSkeleton />;
  }

  if (isError) {
    return (
      <div
        style={{
          backgroundColor: "#1f2937",
          border: "2px solid #4b5563",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "16px",
          borderRadius: "12px",
          textAlign: "center",
          color: "red",
        }}
      >
        Failed to load ticket: {(error as Error).message}
      </div>
    );
  }

  return (
    <div>
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
  );
}
