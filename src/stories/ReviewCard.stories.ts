import { Meta, StoryObj } from "@storybook/react";
import ReviewCard from "../components/ReviewCard";

const meta = {
    title: "MovieDetails/ReviewCard",
    component: ReviewCard,
    tags: ["autodocs"],
} satisfies Meta<typeof ReviewCard>;

export default meta;

type Story = StoryObj<typeof ReviewCard>;

export const Primary: Story = {
    args: {
        rating: 4,
        reviewDate: "2023-10-01",
        reviewId: "1",
        reviewerName: "John Doe",
        reviewText: "This is a sample review text.",
        reviewTitle: "Sample Review Title",
    },
}

export const WithLongText: Story = {
    args: {
        rating: 4,
        reviewDate: "2023-10-01",
        reviewId: "1",
        reviewerName: "John Doe",
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        reviewTitle: "Sample Review Title",
    },
}