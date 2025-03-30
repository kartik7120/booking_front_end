import { Meta, StoryObj } from "@storybook/react";
import Middle from "../components/FrontPage/Middle";

const meta = {
    title: "FrontPage/Middle",
    component: Middle,
    // parameters: {
    //     layout: "centered"
    // }
} satisfies Meta<typeof Middle>

export default meta;

type Story = StoryObj<typeof Middle>

export const Primary: Story = {
    args: {
        NowPlayingMovies: [
            {
                imageURL: "https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
                movie_id: 27,
                movie_name: "Fast X",
                rating: 2,
                votes: 102934
            },
            {
                imageURL: "https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
                movie_id: 27,
                movie_name: "Fast X",
                rating: 2,
                votes: 102934
            },
            {
                imageURL: "https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
                movie_id: 27,
                movie_name: "Fast X",
                rating: 2,
                votes: 102934
            },
            {
                imageURL: "https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
                movie_id: 27,
                movie_name: "Fast X",
                rating: 2,
                votes: 102934
            },
            {
                imageURL: "https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
                movie_id: 27,
                movie_name: "Fast X",
                rating: 2,
                votes: 102934
            },
            {
                imageURL: "https://image.tmdb.org/t/p/w200/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
                movie_id: 27,
                movie_name: "Fast X",
                rating: 2,
                votes: 102934
            }
        ]
    }
}