import { Meta, StoryObj } from "@storybook/react";
import SeatSelectionIndex from "../components/SeatSelection/SeatSelectionIndex";
import withReactQuery from "../../.storybook/decorators/withReactQuery";
import { reactRouterParameters } from "storybook-addon-remix-react-router";
import withReactRouter from "../../.storybook/decorators/withReactRouter"

const meta = {
    title: "Seat Selection/Index",
    component: SeatSelectionIndex,
    parameters: {
        layout: "centered",
        reactRouter: reactRouterParameters({
            location: {
                pathParams: {
                    id: 1,
                    movieTimeSlotID: 1,
                    venueID: 1
                }
            },
            routing: {
                path: "/movie/:id/movieTimeSlots/:movieTimeSlotID/venue/:venueID/seatSelection",
                // Component: Index
            }
        }),
        decorators: [withReactQuery, withReactRouter],
        tags: ["autodocs"]
    }
} satisfies Meta<typeof SeatSelectionIndex>

export default meta;

type Story = StoryObj<typeof SeatSelectionIndex>;

export const Primary: Story = {
    args: {
    }
}