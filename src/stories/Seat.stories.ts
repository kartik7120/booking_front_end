import { Meta, StoryObj } from "@storybook/react";
import Seat from "../components/SeatSelection/Seat";

const meta = {
    title: "Seat Selection/Seat",
    component: Seat,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        onClick: { action: "clicked" },
        isBooked: { control: "boolean" },
        isSelected: { control: "boolean" },
    },
} satisfies Meta<typeof Seat>;

export default meta;

type Story = StoryObj<typeof Seat>;

export const Primary: Story = {
    args: {
        seatNumber: "A1",
        price: 100,
        row: 0,
        column: 0,
        type: "TWO_D",
        id: 1,
        isBooked: false,
        isSelected: true,
    }
}