export interface SeatProps {
    // Define the properties that Seat will accept
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
    return (
        <div className={`flex flex-col items-center justify-center ${props.isBooked ? "" : props.isSelected ? "" : "text-green-600"} w-8 h-8 border-2 rounded-lg ${props.isBooked ? "" : "cursor-pointer"} transition-all duration-200 ${!props.isBooked && !props.isSelected ? "hover:bg-green-600 hover:text-white" : ""} ease-in-out ${props.isBooked ? "bg-gray-300 text-gray-900 border-white cursor-not-allowed" : props.isSelected ? "bg-green-500 border-green-700" : "bg-white border-green-400 hover:bg-gray-100"}`}>
            <p className="text-center text-sm font-semibold">
                {props.seatNumber}
            </p>
        </div>
    )
}
