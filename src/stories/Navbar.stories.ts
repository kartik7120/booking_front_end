import { Meta, StoryObj } from "@storybook/react";
import Navbar from "../components/FrontPage/Navbar";

const meta = {
    title: "frontpage/ navbar",
    component: Navbar,
} satisfies Meta<typeof Navbar>

export default meta;

type Story = StoryObj<typeof Navbar>

export const IsLoggedIn: Story = {
    args: {
        isLoggedIn: true
    }
}

export const IsNotLoggedIn: Story = {
    args: {
        isLoggedIn: false
    }
}