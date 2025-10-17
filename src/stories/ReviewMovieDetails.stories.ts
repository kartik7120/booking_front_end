import { Meta } from "@storybook/react";
import ReviewMovieDetails from "../components/AddReview/ReviewMovieDetails";

const meta = {
    title: "Review/ ReviewMovieDetails",
    component: ReviewMovieDetails,
    tags: ["autodocs"],
    argTypes: {
        movieTitle: { control: 'text' },
        moviePosterUrl: { control: 'text' },
        movieReleaseDate: { control: 'text' },
    },
    args: {
        movieTitle: "Inception",
        moviePosterUrl: "https://m.media-amazon.com/images/I/51s+4GZ7HkL._AC_SY445_.jpg",
        movieReleaseDate: "2010-07-16",
        movieRating: 4.5,
        userRating: 5,
    }
} satisfies Meta<typeof ReviewMovieDetails>;

export default meta;

export const Default = {
    args: {
        movieTitle: "Inception",
        moviePosterUrl: "https://m.media-amazon.com/images/I/51s+4GZ7HkL._AC_SY445_.jpg",
        movieReleaseDate: "2010-07-16",
        movieRating: 4.5,
        userRating: 5,
    }
}

export const AnotherExample = {
    args: {
        movieTitle: "The Dark Knight",
        moviePosterUrl: "https://m.media-amazon.com/images/I/51EbJjlLgPL._AC_SY445_.jpg",
        movieReleaseDate: "2008-07-18",
        movieRating: 4.8,
        userRating: 4,
    }
}