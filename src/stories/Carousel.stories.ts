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
                summary: "bwhevruwvghuirhwyghwrignjuiwrnguirwnguirnwgunruignwuhgirwnguirnwgubnwrigbhwbrgyu",
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
                ],
                movie_id: 61
            },
            {
                title: "Interstellar",
                genreTags: ["Sci-fi", "Drama"],
                rating: 4,
                summary: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                duration: 7200000,
                releaseYear: 2014,
                cast_crew: [
                    {
                        "name": "Ryan Gosling",
                        "character_name": "K",
                        "photourl": "https://example.com/ryan_gosling.jpg"
                    },
                    {
                        "name": "Harrison Ford",
                        "character_name": "Rick Deckard",
                        "photourl": "https://example.com/harrison_ford.jpg"
                    },
                    {
                        "name": "Ana de Armas",
                        "character_name": "Joi",
                        "photourl": "https://example.com/ana_de_armas.jpg"
                    },
                    {
                        "name": "Denis Villeneuve",
                        "character_name": "Director",
                        "photourl": "https://example.com/denis_villeneuve.jpg"
                    },

                ],
                movie_id: 61

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
                summary: "bwhevruwvghuirhwyghwrignjuiwrnguirwnguirnwgunruignwuhgirwnguirnwgubnwrigbhwbrgyu",
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
                ],
                movie_id: 61
            }
        ]
    }
}