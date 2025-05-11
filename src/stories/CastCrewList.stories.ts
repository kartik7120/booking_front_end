import { Meta, StoryObj } from "@storybook/react";
import CastCrewList from "../components/CastCrewList";

const meta = {
    title: "MovieDetails/CastCrewList",
    component: CastCrewList,
    tags: ["autodocs"],
} satisfies Meta<typeof CastCrewList>

export default meta;

type Story = StoryObj<typeof CastCrewList>

export const Primary: Story = {
    args: {
        cast_crew: [
            {
                "name": "Robert Pattinson",
                "character_name": "Bruce Wayne / Batman",
                "photourl": "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            },
            {
                "name": "Zoë Kravitz",
                "character_name": "Selina Kyle / Catwoman",
                "photourl": "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            },
            {
                "name": "Paul Dano",
                "character_name": "Edward Nashton / Riddler",
                "photourl": "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            },
            {
                "name": "Matt Reeves",
                "character_name": "Director",
                "photourl": "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }

        ]
    }
}