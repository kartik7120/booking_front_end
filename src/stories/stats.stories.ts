import { Meta } from "@storybook/react";
import Stats from "../components/FrontPage/Stats";

const meta = {
    title: "FrontPage/Stats",
    component: Stats,
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Stats>;

export default meta;

export const Default = {
    args: {},
};