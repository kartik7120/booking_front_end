import { Meta, StoryObj } from "@storybook/react";
import CinemagicIcon from "../components/FrontPage/CinemagicIcon";

const meta = {
    title: "frontend/cinemagic icon",
    component: CinemagicIcon,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof CinemagicIcon>

export default meta;

type Story = StoryObj<typeof CinemagicIcon>

export const Primary: Story = {
}