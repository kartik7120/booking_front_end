import { Meta } from "@storybook/react";
import AdminMovieIndexDashboard from "../components/AdminMovieDashboard/AdminMovieIndexDashboard";

const meta = {
    title: "Components/AdminMovieDashboard/AdminMovieIndexDashboard",
    component: AdminMovieIndexDashboard,

    parameters: {
        layout: "centered",
    },

} satisfies Meta<typeof AdminMovieIndexDashboard>;

export default meta;

export const AdminMovieIndexDashboardStory = {
    args: {},
};