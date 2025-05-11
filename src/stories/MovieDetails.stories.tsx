import { Meta, StoryObj } from "@storybook/react";
import MovieDetails from "../MovieDetails/MovieDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
            refetchOnWindowFocus: false,
        },
    },
})

const meta = {
    title: "MovieDetails/MovieDetails",
    component: MovieDetails,
    tags: ["autodocs"],
    decorators: (
        (Story) => (
            <div>
                <QueryClientProvider client={queryClient}>
                    <Story />
                </QueryClientProvider>
            </div>
        )
    ),
} satisfies Meta<typeof MovieDetails>;

export default meta;

type Story = StoryObj<typeof MovieDetails>;

export const Primary: Story = {
    args: {
        
    }
}