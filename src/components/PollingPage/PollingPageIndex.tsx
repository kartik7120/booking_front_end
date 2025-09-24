import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";

export default function PollingPageIndex() {
    const [status, setStatus] = useState("pending");
    const [message, setMessage] = useState("Loading...");
    const navigate = useNavigate();

    // Get the idempotent key from the zustand store

    const idempotentKey = useStore((state) => state.idempotencyKey)

    useEffect(() => {
        if (!idempotentKey) return;

        const interval = setInterval(async () => {
            try {
                const res = await fetch(
                    `/payment-status?idempotentKey=${idempotentKey}`
                );
                if (!res.ok) return;

                const data = await res.json();
                console.log("polling response:", data);

                if (data.PaymentStatus === "succeeded") {
                    setStatus("succeeded");
                    setMessage("Payment Successful 🎉 Redirecting...");
                    clearInterval(interval);

                    // redirect to ticket page
                    setTimeout(() => {
                        navigate(`/ticket/${data.TicketID}`);
                    }, 2000);
                } else if (data.PaymentStatus === "failed") {
                    setStatus("failed");
                    setMessage("Payment Failed ❌ Please try again.");
                    clearInterval(interval);
                }
            } catch (err) {
                console.error("polling error:", err);
            }
        }, 3000); // poll every 3 seconds

        return () => clearInterval(interval);
    }, [idempotentKey, navigate]);

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center gap-4 bg-base-200">
            {status === "pending" && (
                <>
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="text-lg font-semibold">{message}</p>
                    <p>Please do not close this window</p>
                </>
            )}

            {status === "succeeded" && (
                <>
                    <p className="text-lg font-semibold text-green-600">{message}</p>
                </>
            )}

            {status === "failed" && (
                <>
                    <p className="text-lg font-semibold text-red-600">{message}</p>
                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => navigate("/checkout")}
                    >
                        Try Again
                    </button>
                </>
            )}
        </div>
    );
}
