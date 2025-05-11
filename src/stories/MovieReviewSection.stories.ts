import { Meta, StoryObj } from "@storybook/react";
import MovieReviewSection from "../MovieDetails/MovieReviewSection";

const meta = {
    title: "MovieDetails/Movie Review Section",
    component: MovieReviewSection,
    tags: ["autodocs"],
} satisfies Meta<typeof MovieReviewSection>;

export default meta;

type Story = StoryObj<typeof MovieReviewSection>;

export const Primary: Story = {
    args: {
        rating: 4,
        votings: 100,
        totalReviews: 50,
        reviews: [
            {
                rating: 4,
                reviewDate: "2023-10-01",
                reviewerName: "John Doe",
                reviewId: "1",
                reviewText: "Great movie! Highly recommend it.",
                reviewTitle: "Amazing!",
            },
            {
                rating: 5,
                reviewDate: "2023-10-02",
                reviewerName: "Jane Smith",
                reviewId: "2",
                reviewText: "A must-watch for everyone.",
                reviewTitle: "Fantastic!",
            }
        ]
    }
}