import { Meta, StoryObj } from "@storybook/react";
import Ticket from "../components/TicketPage/Ticket";

const meta = {
    title: "TicketPage/Ticket",
    component: Ticket,
    tags: ["autodocs"],
} satisfies Meta<typeof Ticket>;

export default meta;

type Story = StoryObj<typeof Ticket>;

export const Default: Story = {
    args: {
        imageURL: "https://via.placeholder.com/150",
        movieTitle: "Inception",
        cinemaName: "Cineplex 10",
        showTime: "7:30 PM",
        seatNumbers: ["A1", "A2", "A3"],
        bookingID: "ABC123XYZ",
        qrCodeURL: "https://via.placeholder.com/100",
        date: "2023-10-15",
        format: "IMAX",
        language: "English",
        venueName: "Main Hall",
        screenNumber: "5",
    }
};

export const AnotherExample: Story = {
    args: {
        imageURL: "https://via.placeholder.com/150",
        movieTitle: "The Dark Knight",
        cinemaName: "Grand Cinema",
        showTime: "9:00 PM",
        seatNumbers: ["B5", "B6"],
        bookingID: "XYZ789ABC",
        qrCodeURL: "https://via.placeholder.com/100",
    }
};
