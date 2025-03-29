import { Meta, StoryObj } from "@storybook/react";
import Top from "../components/FrontPage/Top";

const meta = {
    title: "FrontPage/Top",
    component: Top,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof Top>

export default meta

type Story = StoryObj<typeof Top>

export const Primary: Story = {
    args: {
        imageURLs: [
            "https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg​",
            "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
            "https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg"
        ],
        shouldAutoScroll: true,
        scrollInterval: 3000,
        title: "The Batman",
        genreTags: ["Action", "Sci-fi"],
        rating: 3, // out of 5
        director: "Robert",
        stars: ["Robert Pattinson", "Michael Keaton", "Christian Bale"], // main stars
        summary: "bwhevruwvghuirhwyghwrignjuiwrnguirwnguirnwgunruignwuhgirwnguirnwgubnwrigbhwbrgyu", // small summary
        duration: 4500000,
        releaseYear: 2008
    }
}