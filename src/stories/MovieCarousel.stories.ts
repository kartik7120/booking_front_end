import { Meta, StoryObj } from "@storybook/react";
import MovieCard from "../components/MovieCard";

const meta = {
    title: "FrontPage/MovieCarousel",
    component: MovieCard,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof MovieCard>

export default meta

type Story = StoryObj<typeof MovieCard>

export const Normal: Story = {
    args: {
        imageURL: "https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
        rating: 3,
        votes: 10000
    }
}