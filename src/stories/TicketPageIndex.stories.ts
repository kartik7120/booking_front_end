import { Meta } from "@storybook/react";
import TicketPageIndex from "../components/TicketPage/TicketPageIndex";

const meta = {
    title: "TicketPage/Index",
    component: TicketPageIndex,
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof TicketPageIndex>;

export default meta;

export const Primary = {
    args: {},
};