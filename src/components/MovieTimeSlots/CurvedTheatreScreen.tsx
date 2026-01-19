export default function CurvedTheatreScreen() {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 100"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
        >
            {/* Curved screen */}
            <path
                d="M 20 70 Q 100 10 180 70"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Screen label */}
            <text
                x="100"
                y="85"
                textAnchor="middle"
                fontSize="8"
                fill="#9ca3af" // tailwind gray-400
                letterSpacing="2"
            >
                SCREEN
            </text>
        </svg>
    )
}
