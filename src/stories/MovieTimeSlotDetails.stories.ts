import { Meta, StoryObj } from "@storybook/react";
import MovieTimeSlotsDetails from "../components/MovieTimeSlots/MovieTimeSlotsDetails";

const meta = {
    title: "MovieTimeSlot/movie time slots details",
    component: MovieTimeSlotsDetails,
    tags: ["autodocs"],
} satisfies Meta<typeof MovieTimeSlotsDetails>;

export default meta

type Story = StoryObj<typeof MovieTimeSlotsDetails>;

export const Primary: Story = {
    args: {
        movieVenues: [
            {
                venueName: "Venue 1",
                timeSlots: [
                    { time: "10:00", halfFull: true },
                    { time: "12:00", houseFull: true },
                    { time: "14:00", almostFull: true },
                ],
            },
            {
                venueName: "Venue 2",
                timeSlots: [
                    { time: "16:00", halfFull: true },
                    { time: "18:00", houseFull: true },
                    { time: "20:00", almostFull: true },
                ],
            },
            {
                venueName: "Venue 3",
                timeSlots: [
                    {
                        time: "2:00"
                    }
                ]
            }
        ],
    },
}