import { Meta, StoryObj } from "@storybook/react";
import ConfirmOrderContactDetails from "../components/ConfirmOrder/ConfirmOrderContactDetails";

const meta = {
    title: "User info/contact details",
    component: ConfirmOrderContactDetails,
} satisfies Meta<typeof ConfirmOrderContactDetails>

export default meta

type Story = StoryObj<typeof ConfirmOrderContactDetails>

export const Primary: Story = {

}