interface TimeSlotProps {
    time: string // format is 24hr
    halfFull?: boolean // means half seats are full, color to use is yellow
    houseFull?: boolean // means all seats are full, color to use is grey
    almostFull?: boolean // means only 10% seats are left, color to use is red
    // Default is green where seats available are more than 50%
}

export default function TimeSlot(props: TimeSlotProps) {

    function formatTime(time: string) {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    if (props.halfFull) {
        return (
            <button className="btn btn-soft btn-warning">{formatTime(props.time)}</button>
        )
    }

    if (props.almostFull) {
        return (
            <button className="btn btn-soft btn-error">{formatTime(props.time)}</button>
        )
    }

    if (props.houseFull) {
        return (
            <button className="btn btn-soft bg-gray-500 cursor-not-allowed">{formatTime(props.time)}</button>
        )
    }

    return (
        <div>
            <button className="btn btn-soft btn-success">{formatTime(props.time)}</button>
        </div>
    )
}
