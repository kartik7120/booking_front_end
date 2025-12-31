import { Meta, StoryObj } from "@storybook/react";
import SearchTicket from "../components/SearchTicket/SearchTicket";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const meta = {
    title: "Search tickets",
    component: SearchTicket,

    decorators: [
        (Story) => (
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Story />} />
                </Routes>
            </BrowserRouter>
        )
    ]
} satisfies Meta<typeof SearchTicket>

export default meta;

type Story = StoryObj<typeof SearchTicket>

export const Default: Story = {

}