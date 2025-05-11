import { Meta, StoryObj } from "@storybook/react";
import MovieTimeSlotDate from "../components/MovieTimeSlots/MovieTimeSlotDate";

const meta = {
    title: "MovieTimeSlot/MovieTimeSlot Date",
    component: MovieTimeSlotDate,
    tags: ["autodocs"],
} satisfies Meta<typeof MovieTimeSlotDate>;

export default meta

type Story = StoryObj<typeof MovieTimeSlotDate>;

export const Primary: Story = {
    args: {
        date: "2023-10-01",
        available: true,
    }
}

export const isLoading: Story = {
    args: {
        available: true,
        isLoading: true
    }
}