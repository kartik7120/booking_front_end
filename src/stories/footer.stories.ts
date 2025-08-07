import { Meta, StoryObj } from "@storybook/react";
import Footer from "../components/FrontPage/footer";

const meta = {
    title: "FrontPage/Footer",
    component: Footer,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Footer>

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
    args: {},
};