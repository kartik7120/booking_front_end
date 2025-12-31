import { useEffect, useMemo, useCallback } from "react";
import Seat from "./Seat";

/* =========================
   Types
========================= */

export interface SeatType {
    price: number;
    row: number;
    column: number;
    type: "TWO_D" | "THREE_D" | "FOUR_D" | "VIP";
    isBooked: boolean;
    id: number;              // seatMatrixID
    bookedSeatId?: number;   // ✅ booked_seats.id
    isSelected?: boolean;
    seatNumber: string;
    onClick: () => void;
}

export interface SeatMatrix {
    [rowKey: string]: SeatType[];
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
            id: number; // seatMatrixID
        }[];
        bookedSeats: {
            id: number; // bookedSeatID
            seat_number: string;
            seatMatrixID: number;
            is_booked: boolean;
        }[];
    };

    selectedSeats: SeatType[];
    setSelectSeatState: React.Dispatch<React.SetStateAction<SeatType[]>>;
    rowColumnMatrix: SeatMatrix;
    setRowColumnMatrix: React.Dispatch<React.SetStateAction<SeatMatrix>>;
}

/* =========================
   Component
========================= */

export default function SeatMap({
    seats,
    selectedSeats,
    setSelectSeatState,
    rowColumnMatrix,
    setRowColumnMatrix,
}: SeatMapProps) {

    /* =========================
       Helpers
    ========================= */

    const selectedSeatNumbers = useMemo(
        () => new Set(selectedSeats.map(s => s.seatNumber)),
        [selectedSeats]
    );

    const rowLabels = useMemo(
        () => Array.from({ length: seats.totalRows }, (_, i) => String.fromCharCode(65 + i)),
        [seats.totalRows]
    );

    /* =========================
       Seat click handler
    ========================= */

    const handleSeatClick = useCallback((seat: SeatType) => {
        setSelectSeatState(prev => {
            const alreadySelected = prev.some(s => s.seatNumber === seat.seatNumber);

            if (alreadySelected) {
                return prev.filter(s => s.seatNumber !== seat.seatNumber);
            }

            return [...prev, { ...seat, isSelected: true }];
        });
    }, [setSelectSeatState]);

    /* =========================
       Build Seat Matrix
    ========================= */

    const computedSeatMatrix = useMemo<SeatMatrix>(() => {
        const matrix: SeatMatrix = {};

        for (let r = 0; r < seats.totalRows; r++) {
            const rowKey = String.fromCharCode(65 + r);
            matrix[rowKey] = [];

            for (let c = 0; c < seats.totalColumns; c++) {
                const seatNumber = `${rowKey}${c + 1}`;

                const seat = seats.seatMap.find(s => s.seat_number === seatNumber);
                const bookedSeat = seats.bookedSeats.find(
                    b => b.seat_number === seatNumber && b.is_booked
                );

                if (!seat) {
                    matrix[rowKey].push({
                        price: -1,
                        row: r,
                        column: c,
                        type: "TWO_D",
                        isBooked: false,
                        id: -1,
                        seatNumber,
                        onClick: () => { },
                    });
                    continue;
                }

                matrix[rowKey].push({
                    price: seat.price,
                    row: seat.row,
                    column: seat.column,
                    type: seat.type,
                    id: seat.id,                    // seatMatrixID
                    bookedSeatId: bookedSeat?.id,   // ✅ booked seat ID
                    isBooked: Boolean(bookedSeat),
                    isSelected: selectedSeatNumbers.has(seatNumber),
                    seatNumber,
                    onClick: () =>
                        handleSeatClick({
                            price: seat.price,
                            row: seat.row,
                            column: seat.column,
                            type: seat.type,
                            id: seat.id,
                            bookedSeatId: bookedSeat?.id,
                            isBooked: Boolean(bookedSeat),
                            seatNumber,
                            onClick: () => { },
                        }),
                });
            }
        }

        return matrix;
    }, [seats, selectedSeatNumbers, handleSeatClick]);

    /* =========================
       Sync to parent state
    ========================= */

    useEffect(() => {
        setRowColumnMatrix(computedSeatMatrix);
    }, [computedSeatMatrix, setRowColumnMatrix]);

    /* =========================
       Render
    ========================= */

    return (
        <div className="w-full overflow-x-auto select-none">
            <div className="flex gap-x-5">

                {/* Row Labels */}
                <div className="flex flex-col gap-y-5 text-gray-400">
                    {rowLabels.map(label => (
                        <div key={label} className="w-8 h-8 flex items-center justify-center">
                            {label}
                        </div>
                    ))}
                </div>

                {/* Seats */}
                <div className="flex flex-col gap-y-4">
                    {Object.entries(rowColumnMatrix).map(([rowKey, rowSeats]) => (
                        <div key={rowKey} className="flex gap-x-6">
                            {rowSeats.map(seat =>
                                seat.price === -1 ? (
                                    <div key={seat.seatNumber} className="w-8 h-8" />
                                ) : (
                                    <Seat
                                        key={seat.seatNumber}
                                        {...seat}
                                        isSelected={selectedSeats.some(
                                            s => s.seatNumber === seat.seatNumber
                                        )}
                                    />
                                )
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
