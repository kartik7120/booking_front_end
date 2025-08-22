import { Meta, StoryObj } from "@storybook/react";
import VideoPlayer from "../components/VideoPlayer";

const meta = {
    title: "MovieDetails/VideoPlayer",
    component: VideoPlayer,
} satisfies Meta<typeof VideoPlayer>

export default meta;

type Story = StoryObj<typeof VideoPlayer>

export const Primary: Story = {
    args: {
        videoURL: "https://www.youtube.com/watch?v=mqqft2x_Aa4",
        posterURL: "",
        genres: ["Action", "Thriller"],
        rating: "7",
        releaseYear: "2025",
        summary: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        loginImageURL: "https://res.cloudinary.com/dprpnkw6j/image/upload/v1755781796/CITYPNG.COM_The_Batman_New_Logo_2021_-_2000x2000_tizsib.png",
        duration: 10800000
    }
}