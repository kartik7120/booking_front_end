import { useEffect, useMemo, useState } from "react"
import Seat from "./Seat"

export interface Seat {
    price: number;
    row: number;
    column: number;
    type: "TWO_D" | "THREE_D" | "FOUR_D" | "VIP";
    isBooked: boolean;
    id: number;
    isSelected?: boolean; // Optional, if you want to manage selection state
    seatNumber: string; // Assuming seat_number is a string
    onClick: () => void; // Function to handle click events
}

export interface SeatMapProps {
    // Define the properties that SeatMap will accept
    seats: {
        totalRows: number,
        totalColumns: number,
        seatMap: {
            seat_number: string,
            price: number,
            row: number
            column: number,
            type: "TWO_D" | "THREE_D" | "FOUR_D" | "VIP"
            id: number
        }[],
        bookedSeats: {
            id: number,
            seat_number: string,
            movieTimeSlotID: number,
            seatMatrixID: number,
            is_booked: boolean
        }[]
    }
}

interface SeatMatrix {
    [key: string]: Seat[]
}


export default function SeatMap(props: SeatMapProps) {

    const columns = Array.from({ length: props.seats.totalRows }, (_, i) => String.fromCharCode(65 + i));

    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const [rowColumnMatrix, setRowColumnMatrix] = useState<SeatMatrix>({});

    // Group seats based on rows

    const rows = new Map<string, { seat_number: string, price: number, row: number, column: number, type: "TWO_D" | "THREE_D" | "FOUR_D" | "VIP", id: number }[]>();

    useMemo(() => props.seats.seatMap.forEach(seat => {
        const rowKey = `Row ${seat.row + 1}`;
        if (!rows.has(rowKey)) {
            rows.set(rowKey, []);
        }
        rows.get(rowKey)?.push(seat);
    }), [props.seats])

    useEffect(() => {
        // Creating a row column matrix where we will start from row 0 and column 0 to largest row and column, if no seat is present in that row and column, we will fill it with empty seat object which acts as a space.

        interface SeatMatrix {
            [key: string]: Seat[]
        }

        const seatMatrix: SeatMatrix = {};

        for (let row = 0; row < props.seats.totalRows; row++) {
            const rowKey = String.fromCharCode(65 + row); // Convert row index to letter (A, B, C, ...)
            seatMatrix[rowKey] = [];

            for (let col = 0; col < props.seats.totalColumns; col++) {
                const seatNumber = `${rowKey}${col + 1}`; // Assuming seat numbers are like A1, A2, B1, etc.
                const seat = props.seats.seatMap.find(s => s.seat_number === seatNumber);

                if (seat) {
                    seatMatrix[rowKey].push({
                        price: seat.price,
                        row: seat.row,
                        column: seat.column,
                        type: seat.type,
                        isBooked: props.seats.bookedSeats.some(bookedSeat => bookedSeat.seat_number === seat.seat_number && bookedSeat.is_booked),
                        id: seat.id,
                        isSelected: selectedSeats.some(selectedSeat => selectedSeat.seatNumber === seat.seat_number),
                        seatNumber: seat.seat_number,
                        onClick: () => {
                            // Handle click event, e.g., toggle selection
                            setSelectedSeats(() => {
                                const isSelected = selectedSeats.some(selectedSeat => selectedSeat.seatNumber === seat.seat_number);
                                if (isSelected) {
                                    // If already selected, remove it
                                    return selectedSeats.filter(selectedSeat => selectedSeat.seatNumber !== seat.seat_number);
                                } else {
                                    // If not selected, add it
                                    return [...selectedSeats, {
                                        price: seat.price,
                                        row: seat.row,
                                        column: seat.column,
                                        type: seat.type,
                                        isBooked: false, // Assuming we don't need to track booked state here
                                        id: seat.id,
                                        isSelected: true,
                                        seatNumber: seat.seat_number,
                                        onClick: () => { } // No action for empty seats
                                    }];
                                }
                            });
                        }
                    });
                } else {
                    // If no seat exists for this position, add an empty object or a placeholder
                    seatMatrix[rowKey].push({
                        price: -1, // Placeholder price, adjust as needed
                        row: row,
                        column: col,
                        type: "TWO_D", // Default type or adjust as needed
                        isBooked: false,
                        id: -1, // Placeholder ID
                        isSelected: false,
                        seatNumber: seatNumber,
                        onClick: () => { } // No action for empty seats
                    });
                }
            }
        }

        setRowColumnMatrix(() => {
            return seatMatrix;
        });

    }, [props.seats, selectedSeats]);

    return (
        <div className="w-full">
            <div className="flex flex-row items-start gap-x-5 gap-y-5">
                {/* This shows different columns and their names */}
                <div className="flex flex-col items-center justify-center gap-y-5 text-gray-400">
                    {
                        columns.map((column, index) => (
                            <div key={index} className="w-8 h-8 flex items-center justify-center">
                                {column}
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col items-center gap-y-4">
                    {
                        rowColumnMatrix && Object.entries(rowColumnMatrix).map(([rowKey, seats]) => (
                            <div key={rowKey} className="flex flex-row items-center gap-x-6">
                                {seats.map(seat => {
                                    if (seat.price === -1) {
                                        // This is a placeholder seat, return null or a placeholder component
                                        return <div key={seat.seatNumber} className="w-8 h-8 flex items-center justify-center text-gray-400">

                                        </div>;
                                    }
                                    return <Seat
                                        key={seat.id}
                                        price={seat.price}
                                        row={seat.row}
                                        column={seat.column}
                                        type={seat.type}
                                        isBooked={seat.isBooked}
                                        id={seat.id}
                                        isSelected={
                                            selectedSeats.some(selectedSeat => selectedSeat.seatNumber === seat.seatNumber)
                                        } // Assuming isSelected is managed elsewhere
                                        seatNumber={seat.seatNumber}
                                        onClick={
                                            seat.onClick // Use the onClick function defined in the seat object
                                        }
                                    />
                                }
                                )}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
