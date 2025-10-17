import { Meta } from "@storybook/react";
import AddReviewIndex from "../components/AddReview/AddReviewIndex";

const meta = {
    title: "Review/AddReview Index",
    component: AddReviewIndex,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof AddReviewIndex>;

export default meta;

export const Primary = {
    args: {},
}