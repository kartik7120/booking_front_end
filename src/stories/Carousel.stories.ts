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
            "https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg​",
            "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
            "https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg"
        ]
    }
}

export const ScrollAuto: Story = {
    args: {
        imageURLs: [
            "https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg​",
            "https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
            "https://image.tmdb.org/t/p/w1280/5P8SmMzSNYikXpxil6BYzJ16611.jpg"
        ],
        shouldAutoScroll: true,
        scrollInterval: 3000
    }
}