import { Meta, StoryObj } from "@storybook/react";
import Carousel from "../components/Carousel";

const meta = {
    title: "FrontPage/Carousel",
    component: Carousel,
    parameters: {
        layout: 'centered',
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Carousel>

type Story = StoryObj<typeof Carousel>

export default meta;

export const Primary: Story = {
    args: {
        imageURLs: [
            "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
            "https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg"
        ],
        CarouselLayoverProps: [
            {
                title: "The Batman",
                genreTags: ["Action", "Sci-fi"],
                rating: 3,
                director: "Robert",
                stars: ["Robert Pattinson", "Michael Keaton", "Christian Bale"],
                summary: "bwhevruwvghuirhwyghwrignjuiwrnguirwnguirnwgunruignwuhgirwnguirnwgubnwrigbhwbrgyu",
                duration: 4500000,
                releaseYear: 2008
            },
            {
                title: "Interstellar",
                genreTags: ["Sci-fi", "Drama"],
                rating: 4,
                director: "Christopher Nolan",
                stars: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
                summary: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                duration: 7200000,
                releaseYear: 2014
            }
        ],
    }
}

export const ScrollAuto: Story = {
    args: {
        imageURLs: [
            "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
            "https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg"
        ],
        shouldAutoScroll: true,
        scrollInterval: 3000,
        CarouselLayoverProps: [
            {
                title: "The Batman",
                genreTags: ["Action", "Sci-fi"],
                rating: 3,
                director: "Robert",
                stars: ["Robert Pattinson", "Michael Keaton", "Christian Bale"],
                summary: "bwhevruwvghuirhwyghwrignjuiwrnguirwnguirnwgunruignwuhgirwnguirnwgubnwrigbhwbrgyu",
                duration: 4500000,
                releaseYear: 2008
            }
        ]
    }
}