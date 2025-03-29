import { Meta, StoryObj } from "@storybook/react";
import CarouselLayover from "../components/FrontPage/CarouselLayover";

const meta = {
    title: "FrontPage/CarouselLayover",
    component: CarouselLayover,
    parameters: {
        layout: 'centered',
    },
    tags: ["autodocs"]
} satisfies Meta<typeof CarouselLayover>

type Story = StoryObj<typeof CarouselLayover>

export default meta;

export const Primary: Story = {
    args: {
        title: "The Batman",
        genreTags: ["Action","Sci-fi"],
        rating: 3, // out of 5
        director: "Robert",
        stars: ["Robert Pattinson", "Michael Keaton", "Christian Bale"], // main stars
        summary: "bwhevruwvghuirhwyghwrignjuiwrnguirwnguirnwgunruignwuhgirwnguirnwgubnwrigbhwbrgyu", // small summary
        duration: 4500000,
        releaseYear: 2008
    }
}