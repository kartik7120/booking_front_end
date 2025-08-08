import { motion } from "motion/react"

function convertNumberToK(num: number): string {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : `${num}`;
}

export default function Stats() {
    return (
        <div className="flex flex-col md:flex-row justify-around items-center p-4 border border-gray-300 rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center p-4">
                {/* Number of user's */}
                <motion.div
                    initial={{
                        opacity: 0,
                        translateY: 20,
                        scale: 0.8
                    }}
                    whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    viewport={{ once: true }}

                >
                    <p className="text-4xl font-bold font-mono">
                        {/* This should be dynamic, fetching from the backend */}
                        {convertNumberToK(10000)}
                    </p>
                </motion.div>
                <motion.div
                    viewport={{ once: true }}
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    <p className="text-4xl font-bold font-mono">
                        Customers
                    </p>
                </motion.div>
            </div>
            <div className="divider lg:divider-horizontal"></div>
            <div className="flex flex-col items-center justify-center p-4">
                {/* Number of tickets booked */}
                <motion.div
                    // viewport={{ once: true }}
                    initial={{
                        // make a pop up effect from bottom
                        opacity: 0,
                        translateY: 20,
                        scale: 0.8
                    }}
                    whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    viewport={{ once: true }}
                >
                    <p className="text-4xl font-bold font-mono">
                        {/* This should be dynamic, fetching from the backend */}
                        {convertNumberToK(50000)}
                    </p>
                </motion.div>
                <motion.div
                    viewport={{ once: true }}
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    <p className="text-4xl font-bold font-mono">
                        Tickets booked
                    </p>
                </motion.div>
            </div>
            <div className="divider lg:divider-horizontal"></div>

            <div className="flex flex-col items-center justify-center p-4">
                {/* Number of venues */}
                <motion.div
                    // viewport={{ once: true }}
                    initial={{
                        // make a pop up effect from bottom
                        opacity: 0,
                        translateY: 20,
                        scale: 0.8
                    }}
                    whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    viewport={{ once: true }}

                >
                    <p className="text-4xl font-bold font-mono">
                        {/* This should be dynamic, fetching from the backend */}
                        {convertNumberToK(150)}+
                    </p>
                </motion.div>
                <motion.div
                    viewport={{ once: true }}
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    <p className="text-4xl font-bold font-mono">
                        Registered venues
                    </p>
                </motion.div>
            </div>
            <div className="divider lg:divider-horizontal"></div>

            <div className="flex flex-col items-center justify-center p-4">
                {/* Daily bookings */}
                <motion.div
                    // viewport={{ once: true }}
                    initial={{
                        // make a pop up effect from bottom
                        opacity: 0,
                        translateY: 20,
                        scale: 0.8
                    }}
                    whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    viewport={{ once: true }}

                >
                    <p className="text-4xl font-bold font-mono">
                        {/* This should be dynamic, fetching from the backend */}
                        {convertNumberToK(2000)}
                    </p>
                </motion.div>
                <motion.div
                    viewport={{ once: true }}
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    <p className="text-4xl font-bold font-mono">
                        Daily bookings
                    </p>
                </motion.div>
            </div>
        </div >
    )
}
