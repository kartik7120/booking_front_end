import { Meta, StoryObj } from "@storybook/react";
import ConfirmOrderContactDetails from "../components/ConfirmOrder/ConfirmOrderContactDetails";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const meta = {
    title: "User info/contact details",
    component: ConfirmOrderContactDetails,
    decorators: (Story) => (
        <QueryClientProvider client={new QueryClient()} >
            <div className="m-4 p-4 border-2 border-dashed">
                <Story />
            </div>
        </QueryClientProvider>
    )
} satisfies Meta<typeof ConfirmOrderContactDetails>

export default meta

type Story = StoryObj<typeof ConfirmOrderContactDetails>

export const Primary: Story = {

}