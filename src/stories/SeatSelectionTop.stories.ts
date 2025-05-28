import { Meta } from "@storybook/react";
import SeatSelectionTop from "../components/SeatSelection/SeatSelectionTop";
import { reactRouterParameters, withRouter } from "storybook-addon-remix-react-router";
import withReactQuery from "../../.storybook/decorators/withReactQuery";

const meta: Meta<typeof SeatSelectionTop> = {
    title: "Seat Selection/SeatSelectionTop",
    component: SeatSelectionTop,
    parameters: {
        layout: "centered",
        reactRouter: reactRouterParameters({
            location: {
                pathParams: { id: '1', showID: '1' },
            },
            routing: {
                path: '/movie/:id/movieTimeSlots/:showID/seatSelection',
                handle: 'Profile',
            },
        }),
    },
    tags: ["autodocs"],
    decorators: [withRouter, withReactQuery],
}

export default meta;

export const Default = {
    args: {
        movieName: "Inception",
        venueName: "Cineplex 1",
        showTime: new Date("2023-10-01T19:30:00"),
        showDate: new Date("2023-10-01"),
    },
};