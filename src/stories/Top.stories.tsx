import { Meta, StoryObj } from "@storybook/react";
import Top from "../components/FrontPage/Top";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import Index from "../components/Index";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }
    }
})

const meta = {
    title: "FrontPage/Top",
    component: Top,
    decorators: [
        (Story) => (
            <div style={{ margin: '3em' }} >
                <QueryClientProvider client={queryClient} >
                    <BrowserRouter>
                        <Routes>
                            <Route index element={<Index />} />
                        </Routes>
                    </BrowserRouter>
                    <Story />
                </QueryClientProvider>
            </div>
        )
    ]
} satisfies Meta<typeof Top>

export default meta

type Story = StoryObj<typeof Top>

export const Primary: Story = {
    args: {
        imageURLs: [
            "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
            "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        ],
        // shouldAutoScroll: true,
        // scrollInterval: 3000,
        // title: "The Batman",
        // genreTags: ["Action", "Sci-fi"],
        // rating: 3, // out of 5
        // director: "Robert",
        // stars: ["Robert Pattinson", "Michael Keaton", "Christian Bale"], // main stars
        // summary: "bwhevruwvghuirhwyghwrignjuiwrnguirwnguirnwgunruignwuhgirwnguirnwgubnwrigbhwbrgyu", // small summary
        // duration: 4500000,
        // releaseYear: 2008,
    }
}