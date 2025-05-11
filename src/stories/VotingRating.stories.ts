import { Meta, StoryObj } from "@storybook/react";
import VotesRating from "../components/VotesRating";

const meta = {
    title: "MovieDetails/VotesRating",
    component: VotesRating,
    tags: ["autodocs"],
} satisfies Meta<typeof VotesRating>;

export default meta;

type Story = StoryObj<typeof VotesRating>;

export const Released: Story = {
    args: {
        rating: 8.5,
        votes: 1000,
        isReleased: true,
    }
}

export const NotReleased: Story = {
    args: {
        rating: 0,
        votes: 1000,
        isReleased: false,
    }
}