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
        genreTags: ["Action", "Sci-fi"],
        rating: 3, // out of 5
        summary: "bwhevruwvghuirhwyghwrignjuiwrnguirwnguirnwgunruignwuhgirwnguirnwgubnwrigbhwbrgyu", // small summary
        duration: 4500000,
        releaseYear: 2008,
        cast_crew: [
            {
                "name": "Robert Pattinson",
                "character_name": "Bruce Wayne / Batman",
                "photourl": "https://example.com/robert_pattinson.jpg"
            },
            {
                "name": "Zoë Kravitz",
                "character_name": "Selina Kyle / Catwoman",
                "photourl": "https://example.com/zoe_kravitz.jpg"
            },
            {
                "name": "Paul Dano",
                "character_name": "Edward Nashton / Riddler",
                "photourl": "https://example.com/paul_dano.jpg"
            },
            {
                "name": "Matt Reeves",
                "character_name": "Director",
                "photourl": "https://example.com/matt_reeves.jpg"
            }
        ]
    }
}