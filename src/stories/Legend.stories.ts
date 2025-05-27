import { Meta, StoryObj } from "@storybook/react";
import Legend from "../components/SeatSelection/Legend";

const meta = {
    title: "Seat Selection/Legend",
    component: Legend,
    parameters: {
        layout: "centered",
    }
} satisfies Meta<typeof Legend>;

export default meta;

type Story = StoryObj<typeof Legend>;

export const Default: Story = {
    
}