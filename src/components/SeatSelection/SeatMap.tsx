import { useEffect, useMemo, useCallback } from "react";
import Seat from "./Seat";

export interface Seat {
    price: number;
    row: number;
    column: number;
    type: "TWO_D" | "THREE_D" | "FOUR_D" | "VIP";
    isBooked: boolean;
    id: number;
    isSelected?: boolean;
    seatNumber: string;
    onClick: () => void;
}

export interface SeatMapProps {
    seats: {
        totalRows: number;
        totalColumns: number;
        seatMap: {
            seat_number: string;
            price: number;
            row: number;
            column: number;
            type: "TWO_D" | "THREE_D" | "FOUR_D" | "VIP";
            id: number;
        }[];
        bookedSeats: {
            id: number;
            seat_number: string;
            movieTimeSlotID: number;
            seatMatrixID: number;
            is_booked: boolean;
        }[];
    };
    setSelectSeatState: React.Dispatch<React.SetStateAction<Seat[]>>;
    selectedSeats: Seat[];
    setRowColumnMatrix: React.Dispatch<React.SetStateAction<SeatMatrix>>;
    rowColumnMatrix: SeatMatrix;
}

export interface SeatMatrix {
    [key: string]: Seat[];
}

export default function SeatMap(props: SeatMapProps) {
    const columns = useMemo(
        () => Array.from({ length: props.seats.totalRows }, (_, i) => String.fromCharCode(65 + i)),
        [props.seats.totalRows]
    );

    console.log(`props.seats: ${JSON.stringify(props.seats)}`)

    const selectedSeatSet = useMemo(
        () => new Set(props.selectedSeats.map(s => s.seatNumber)),
        [props.selectedSeats]
    );

    const handleSeatClick = useCallback(
        (seat: Seat) => {
            props.setSelectSeatState(prev => {
                const isSelected = selectedSeatSet.has(seat.seatNumber);
                return isSelected
                    ? prev.filter(s => s.seatNumber !== seat.seatNumber)
                    : [...prev, { ...seat, isSelected: true, onClick: () => { } }];
            });
        },
        [props.setSelectSeatState, selectedSeatSet]
    );

    const seatMatrix = useMemo(() => {
        const selectedSeatSet = new Set(props.selectedSeats.map(s => s.seatNumber));
        const matrix: SeatMatrix = {};

        for (let row = 0; row < props.seats.totalRows; row++) {
            const rowKey = String.fromCharCode(65 + row);
            matrix[rowKey] = [];

            for (let col = 0; col < props.seats.totalColumns; col++) {

                const seatNumber = `${rowKey}${col + 1}`;
                console.log(`seat number created on frontend : ${seatNumber}`)
                const seat = props.seats.seatMap.find(s => s.seat_number === seatNumber);

                console.log(`does seat ${seatNumber} exists : `, seat)

                if (seat) {

                    console.log(`booked seats: ${JSON.stringify(props.seats.bookedSeats)}`)
                    const isBooked = props.seats.bookedSeats.some(
                        booked => booked.seat_number === seat.seat_number && booked.is_booked === true
                    );

                    matrix[rowKey].push({
                        price: seat.price,
                        row: seat.row,
                        column: seat.column,
                        type: seat.type,
                        isBooked,
                        id: seat.id,
                        isSelected: selectedSeatSet.has(seat.seat_number),
                        seatNumber: seat.seat_number,
                        onClick: () => handleSeatClick({
                            price: seat.price,
                            row: seat.row,
                            column: seat.column,
                            type: seat.type,
                            isBooked,
                            id: seat.id,
                            seatNumber: seat.seat_number,
                            onClick: () => { }
                        })
                    });
                } else {
                    matrix[rowKey].push({
                        price: -1,
                        row,
                        column: col,
                        type: "TWO_D",
                        isBooked: false,
                        id: -1,
                        isSelected: false,
                        seatNumber,
                        onClick: () => { }
                    });
                }
            }
        }

        return matrix;
    }, [props.seats, props.selectedSeats, handleSeatClick]);


    useEffect(() => {

        console.log(`row column matrix : ${JSON.stringify(props.rowColumnMatrix)}`)

        if (JSON.stringify(props.rowColumnMatrix) !== JSON.stringify(seatMatrix)) {
            props.setRowColumnMatrix(seatMatrix);
        }
    }, [seatMatrix]);

    console.log(`row and column matrix : ${JSON.stringify(props.rowColumnMatrix)}`)

    return (
        <div className="w-full">
            <div className="flex flex-row items-start gap-x-5 gap-y-5">
                <div className="flex flex-col items-center justify-center gap-y-5 text-gray-400">
                    {columns.map((column, index) => (
                        <div key={index} className="w-8 h-8 flex items-center justify-center">
                            {column}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center gap-y-4">
                    {
                        Object.entries(props.rowColumnMatrix).map(([rowKey, seats]) => (
                            <div key={rowKey} className="flex flex-row items-center gap-x-6">
                                {seats.map(seat =>
                                    seat.price === -1 ? (
                                        <div key={seat.seatNumber} className="w-8 h-8 flex items-center justify-center text-gray-400" />
                                    ) : (
                                        <Seat
                                            key={seat.id}
                                            price={seat.price}
                                            row={seat.row}
                                            column={seat.column}
                                            type={seat.type}
                                            isBooked={seat.isBooked}
                                            id={seat.id}
                                            isSelected={
                                                props.selectedSeats.some(selectedSeat => selectedSeat.seatNumber === seat.seatNumber)
                                            } // Assuming isSelected is managed elsewhere
                                            seatNumber={seat.seatNumber}
                                            onClick={
                                                seat.onClick // Use the onClick function defined in the seat object
                                            }
                                        />
                                    )
                                )}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
