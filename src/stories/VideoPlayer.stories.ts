import { Meta, StoryObj } from "@storybook/react";
import VideoPlayer from "../components/VideoPlayer";

const meta = {
    title: "MovieDetails/VideoPlayer",
    component: VideoPlayer,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof VideoPlayer>

export default meta;

type Story = StoryObj<typeof VideoPlayer>

export const Primary: Story = {
    args: {
        videoURL: "https://www.youtube.com/watch?v=1EOdPDQe9Mk",
    }
}