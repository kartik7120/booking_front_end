export interface SeatProps {
    seatNumber: string;
    price: number;
    row: number;
    column: number;
    type: "TWO_D" | "THREE_D" | "FOUR_D" | "VIP";
    id: number;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    isBooked: boolean;
    isSelected: boolean;
}

export default function Seat(props: SeatProps) {
    const { seatNumber, isBooked, isSelected, onClick } = props;

    console.log(`Seat number: ${seatNumber}, is_booked: ${isBooked}`);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isBooked) return; // 🚫 prevent action if seat is booked
        onClick(e);
    };

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-center justify-center
                w-8 h-8 border-2 rounded-lg transition-all duration-200 ease-in-out
                ${isBooked
                    ? "bg-gray-300 text-gray-900 border-white cursor-not-allowed"
                    : isSelected
                        ? "bg-green-500 border-green-700 text-white"
                        : "bg-white border-green-400 text-green-600 hover:bg-green-600 hover:text-white cursor-pointer"
                }
            `}
        >
            <p className="text-center text-sm font-semibold">
                {seatNumber}
            </p>
        </div>
    );
}
