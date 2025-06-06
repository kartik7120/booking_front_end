import { useMemo } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router";

interface SeatSelectionTopProps {
    movieName: string;
    venueName: string;
    showTime: Date;
    showDate: Date;
}

const dayMap = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
}

export default function SeatSelectionTop(props: SeatSelectionTopProps) {

    const navigate = useNavigate();

    return (
        <div className="flex flex-row items-center gap-x-2 mb-4">
            <div className="cursor-pointer" onClick={() => navigate(-1)}>
                <IoChevronBack size={40} />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl">{props.movieName}</h1>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                    <p className="text-gray-500">{props.venueName}|</p>
                    <p className="text-gray-500">
                        {
                            props.showDate.toLocaleDateString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            }) + " | " + props.showTime.toLocaleTimeString("en-US", {
                                hour: '2-digit',
                                minute: '2-digit'
                            })
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}
