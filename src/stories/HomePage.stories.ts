import { Meta, StoryObj } from "@storybook/react";
import HomePage from "../components/HomePage/HomePage";

const meta = {
    title: "frontpage/homepage",
    component: HomePage,
} satisfies Meta<typeof HomePage>

export default meta;

type Story = StoryObj<typeof HomePage>

export const Primary: Story = {
    args: {

    }
}