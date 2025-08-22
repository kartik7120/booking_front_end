import { Meta, StoryObj } from "@storybook/react";
import VideoPlayerLayover from "../components/VideoPlayerLayover";

const meta = {
    title: "movieDetails/VideoPlayerLayover",
    component: VideoPlayerLayover
} satisfies Meta<typeof VideoPlayerLayover>

export default meta;

type Story = StoryObj<typeof VideoPlayerLayover>

export const Primary: Story = {
    args: {
        duration: "2h 56m",
        genres: ["Action", "Thriller"],
        rating: "7",
        releaseYear: "2025",
        summary: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        loginImageURL: "https://res.cloudinary.com/dprpnkw6j/image/upload/v1755781796/CITYPNG.COM_The_Batman_New_Logo_2021_-_2000x2000_tizsib.png"
    }
}

export const WithoutLogo: Story = {
    args: {
        duration: "2h 56m",
        genres: ["Action", "Thriller"],
        rating: "7",
        releaseYear: "2025",
        summary: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
        // loginImageURL: "https://res.cloudinary.com/dprpnkw6j/image/upload/v1755781796/CITYPNG.COM_The_Batman_New_Logo_2021_-_2000x2000_tizsib.png",
        movie_title: "The Batman"
    }
}