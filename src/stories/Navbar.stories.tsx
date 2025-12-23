import { Meta, StoryObj } from "@storybook/react";
import Navbar from "../components/FrontPage/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";

const [IsLoggedInState, setIsLoggedIn] = useState(false)


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }
    }
})

const meta = {
    title: "frontpage/navbar",
    component: Navbar,
    decorators: [
        (Story) => (
            <div style={{ margin: '3em' }} >
                <QueryClientProvider client={queryClient} >
                    <BrowserRouter>
                        <Routes>
                            <Route index element={<Navbar isLoggedIn={IsLoggedInState} setIsLoggedIn={setIsLoggedIn} />} />
                        </Routes>
                    </BrowserRouter>
                    <Story />
                </QueryClientProvider>
            </div>

        )
    ]
} satisfies Meta<typeof Navbar>

export default meta;

type Story = StoryObj<typeof Navbar>

export const IsLoggedIn: Story = {
    args: {
        isLoggedIn: true
    }
}

export const IsNotLoggedIn: Story = {
    args: {
        isLoggedIn: false
    }
}