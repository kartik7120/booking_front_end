import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

export default function SearchTicket() {
    const navigate = useNavigate();
    const [ticketID, setTicketID] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        navigate(`/ticket/${ticketID}`);
    }

    return (
        <div className="dark min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            {/* Card */}
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-brand/10 text-brand">
                        🎟️
                    </div>
                    <h3 className="text-2xl font-bold text-heading">
                        Retrieve Your Ticket
                    </h3>
                    <p className="text-sm text-body">
                        Enter your booking ID to view or download your movie ticket.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="ticket-id"
                            className="block mb-1 text-sm font-medium text-heading"
                        >
                            Ticket ID
                        </label>

                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-body"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>

                            <input
                                id="ticket-id"
                                type="text"
                                value={ticketID}
                                onChange={(e) => setTicketID(e.target.value)}
                                placeholder="e.g. A1B2C3"
                                maxLength={6}
                                required
                                className="block w-full p-3 ps-9 text-sm text-heading rounded-base border border-default-medium bg-neutral-secondary-medium focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                            />
                        </div>

                        <p className="mt-1 text-xs text-body">
                            Ticket ID is sent to your email after successful booking.
                        </p>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="cursor-pointer w-full text-white bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium font-medium rounded-base text-sm px-4 py-2 transition"
                    >
                        Search Ticket
                    </button>
                </form>

                {/* Footer / Help */}
                <div className="text-center text-xs text-body cursor-pointer">
                    Having trouble finding your ticket?{" "}
                    <span className="text-brand hover:underline cursor-pointer">
                        Contact support
                    </span>
                </div>
            </div>
        </div>
    );
}
