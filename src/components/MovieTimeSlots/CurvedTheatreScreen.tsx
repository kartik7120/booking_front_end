export default function CurvedTheatreScreen() {
    return (
        <svg
            width="60%"
            height="60%"
            viewBox="0 0 200 100"
            xmlns="http://www.w3.org/2000/svg"
        // style={{
        //     position: 'absolute',
        //     bottom: 0,
        //     left: 0,
        //     right: 0,
        //     zIndex: 1,
        // }}

        >
            <path
                d="M 46 68 Q 100 0 159 67"
                fill="none"
                stroke="#fff"
                strokeWidth="1"
                strokeLinecap="round"
            />
        </svg>
    )
}
