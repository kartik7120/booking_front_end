import { Meta, StoryObj } from "@storybook/react";
import SeatMap from "../components/SeatSelection/SeatMap";

const meta = {
    title: "Seat Selection/Seat Map",
    component: SeatMap,
    tags: ["autodocs"],
} satisfies Meta<typeof SeatMap>;

export default meta;

type Story = StoryObj<typeof SeatMap>;

export const Primary: Story = {
    args: {
        seats: {
            totalColumns: 10,
            totalRows: 2,
            seatMap: [
                { seat_number: "A1", price: 100, row: 0, column: 0, type: "TWO_D", id: 1 },
                { seat_number: "A2", price: 100, row: 0, column: 1, type: "TWO_D", id: 2 },
                { seat_number: "A3", price: 100, row: 0, column: 2, type: "TWO_D", id: 3 },
                { seat_number: "A4", price: 100, row: 0, column: 3, type: "TWO_D", id: 4 },
                { seat_number: "A5", price: 100, row: 0, column: 4, type: "TWO_D", id: 5 },
                { seat_number: "B1", price: 100, row: 1, column: 0, type: "TWO_D", id: 6 },
                { seat_number: "B2", price: 100, row: 1, column: 1, type: "TWO_D", id: 7 },
                { seat_number: "B3", price: 100, row: 1, column: 2, type: "TWO_D", id: 8 },
                { seat_number: "B4", price: 100, row: 1, column: 3, type: "TWO_D", id: 9 },
                { seat_number: "B5", price: 100, row: 1, column: 4, type: "TWO_D", id: 10 },
                { seat_number: "B9", price: 100, row: 1, column: 9, type: "TWO_D", id: 11 },
                // Add more seats as needed
            ],
            bookedSeats: [
                { id: 1, seat_number: "A1", movieTimeSlotID: 1, seatMatrixID: 1, is_booked: true },
                { id: 2, seat_number: "A2", movieTimeSlotID: 1, seatMatrixID: 2, is_booked: true },

                // Add more booked seats as needed
            ]
        }
    }
}