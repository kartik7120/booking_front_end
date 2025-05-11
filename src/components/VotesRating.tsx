import { AiFillLike } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

interface VotesRatingProps {
    rating: number
    votes: number
    isReleased: boolean
}

export default function VotesRating(props: VotesRatingProps) {

    function formatNumberWithK(num: number): string {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }


    return (
        <div className="flex flex-row items-center justify-between p-4 rounded-lg shadow-md">
            <div className="flex flex-row items-center gap-2">
                {props.isReleased ? <FaStar color={"yellow"} size={20} /> : <AiFillLike color={"#22bb33"} size={20} />}
                <div>
                    {props.isReleased ? (
                        <div>
                            <span className="text-bold">{formatNumberWithK(props.rating)}</span>
                            <span className="text-bold"> / 10</span>
                        </div>
                    ) : (
                        <div>
                            <span className="text-bold">{formatNumberWithK(props.votes)}</span>
                            <span className="text-bold"> votes</span>
                        </div>
                    )}
                </div>
            </div>
            <div>
                {props.isReleased ? (
                    <div>
                        <button className="btn btn-outline text-bold btn-info">Rate</button>
                    </div>
                ) : (
                    <div>
                        <button className="btn btn-outline text-bold btn-success">Vote now</button>
                    </div>
                )}
            </div>
        </div>
    )
}
