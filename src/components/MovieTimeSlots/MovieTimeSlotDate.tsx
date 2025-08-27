interface MovieTimeSlotDateProps {
    date: string; // should be in YYYY-MM-DD format
    available: boolean; // true if the date is available for booking
    isLoading: boolean;
    onClick?: () => void; // optional click handler
    isSelected?: boolean; // NEW: highlights selected date
}

export default function MovieTimeSlotDate(props: MovieTimeSlotDateProps) {
    const { date, available, isLoading, isSelected, onClick } = props;

    if (isLoading) return <div className="skeleton w-16 h-32"></div>;
    if (!date) return <div></div>;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return <div>Invalid date format</div>;

    const day = date.split("-")[2];
    const month = new Date(date).toLocaleString("default", { month: "short" });

    const baseColor = available ? "bg-red-500 hover:bg-red-600" : "bg-gray-600 hover:bg-gray-700";
    const cursor = available ? "cursor-pointer" : "cursor-not-allowed";
    const ring = isSelected ? "ring-2 ring-yellow-400" : "";

    return (
        <div
            onClick={onClick}
            className={`flex border-2 border-black flex-col items-center justify-center p-4 rounded-lg shadow-md transition duration-300 ease-in-out ${baseColor} ${cursor} ${ring}`}
        >
            <p className="text-2xl font-bold text-white">{day}</p>
            <p className="text-lg font-semibold text-white">{month}</p>
        </div>
    );
}
