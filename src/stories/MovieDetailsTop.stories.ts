import { Meta, StoryObj } from "@storybook/react";
import MovieDetailsTop from "../MovieDetails/MovieDetailsTop";

const meta = {
    title: "MovieDetails/MovieDetailsTop",
    component: MovieDetailsTop,
    tags: ["autodocs"],
} satisfies Meta<typeof MovieDetailsTop>;

export default meta;

type Story = StoryObj<typeof MovieDetailsTop>;

export const Default: Story = {
    args: {
        // Add any props you want to pass to the component here
        movieFormats: ["2D", "3D"],
        movieGenres: ["Action", "Adventure"],
        movieLanguages: ["English", "Spanish"],
        movieDuration: "2h 30m",
        releaseDate: "2023-10-01",
        summary: "This is a sample movie summary that provides an overview of the movie's plot, characters that provides an overview of the movie's plot, characters that provides an overview of the movie's plot, characters that provides an overview of the movie's plot, characters that provides an overview of the movie's plot, characters that provides an overview of the movie's plot, characters, and themes. It gives viewers a glimpse into what to expect from the film without revealing too much detail. The summary is designed to intrigue and engage the audience, encouraging them to watch the movie for a more in-depth experience.",
    },
};