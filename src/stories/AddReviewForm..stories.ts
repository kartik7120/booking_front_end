import { Meta, StoryObj } from "@storybook/react";
import AddReviewForm from "../components/AddReview/AddReviewForm";

const meta = {
    title: "Review/ AddReviewForm",
    component: AddReviewForm,
    tags: ["autodocs"],
    argTypes: {},
    args: {},
} satisfies Meta<typeof AddReviewForm>;

export default meta;

type Story = StoryObj<typeof AddReviewForm>;

export const Default: Story = {
    args: {

    }
}