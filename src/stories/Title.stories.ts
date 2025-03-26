import { Meta, StoryObj } from "@storybook/react";
import Title from "./Title";

const meta = {
    title: "FrontPage/Title",
    component: Title,
    parameters: {
        layout: "centered"
    },
    tags: ["autodocs"],
    argTypes: {
        title: {
            control: "text"
        }
    }
} satisfies Meta<typeof Title>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        title: "Mission Impossible"
    }
}