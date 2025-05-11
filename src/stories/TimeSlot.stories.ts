import { Meta, StoryObj } from "@storybook/react";
import TimeSlot from "../components/MovieTimeSlots/timeSlot";

const meta = {
    title: "MovieTimeSlot/Time slot",
    component: TimeSlot,
    tags: ["autodocs"]
} satisfies Meta<typeof TimeSlot>

export default meta

type Story = StoryObj<typeof TimeSlot>

export const Primary: Story = {
    args: {
        almostFull: false,
        halfFull: false,
        houseFull: false,
        time: "19:30"
    }
}

export const Secondary: Story = {
    args:{
        almostFull: false,
        halfFull: true,
        houseFull: false,
        time: "19:30"
    }
}

export const Tertiary: Story = {
    args:{
        almostFull: false,
        halfFull: false,
        houseFull: true,
        time: "19:30"
    }
}

export const Tertiary2: Story = {
    args:{
        almostFull: true,
        halfFull: false,
        houseFull: false,
        time: "19:30"
    }
}