interface MovieTimeSlotDateProps {
    date: string; // should be in YYYY-MM-DD format
    available: boolean; // true if the date is available for booking
    isLoading: boolean;
    onClick?: () => void; // optional click handler
}

export default function MovieTimeSlotDate(props: MovieTimeSlotDateProps) {

    if (props.isLoading) {
        return <div className="skeleton w-16 h-32"></div>
    }

    if (!props.date) {
        return <div></div>
    }

    // Check if the date is in the correct format

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(props.date)) {
        return <div>Invalid date format</div>
    }

    return (
        <div onClick={props.onClick} className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md ${props.available ? 'bg-red-500' : 'bg-gray-600'} ${props.available ? 'hover:bg-red-600' : 'hover:bg-gray-700'} transition duration-300 ease-in-out ${props.available ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
            {/* DD of date */}
            <p className="text-2xl font-bold text-white">
                {props.date && props.date.split("-")[2]}
            </p>
            {/* Month of date */}
            <p className="text-lg font-semibold text-white">
                {props.date && new Date(props.date).toLocaleString('default', { month: 'short' })}
            </p>
        </div>
    )
}
