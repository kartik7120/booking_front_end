import { Meta, StoryObj } from "@storybook/react";
import MovieTimeSlotIndex from "../components/MovieTimeSlots/Index";
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';
import withReactQuery from "../../.storybook/decorators/withReactQuery";

const meta: Meta<typeof MovieTimeSlotIndex> = {
  title: "MovieTimeSlot/MovieTimeSlot Index",
  component: MovieTimeSlotIndex,
  tags: ["autodocs"],
  decorators: [withRouter, withReactQuery],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { id: '1' },
        state: {
          movie_name: "Avatar: The Way of Water",
          movie_language: "English",
          tags: ["Action", "Adventure", "Fantasy"],
          movie_id: 1,
        },
      },
      routing: {
        path: '/movie/:id/movieTimeSlots',
        handle: 'Profile',
      },
    }),
  },
};

export default meta;

type Story = StoryObj<typeof MovieTimeSlotIndex>;

export const Primary: Story = {};
