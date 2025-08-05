import { Decorator } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const withReactRouter: Decorator = (Story) => (
  <MemoryRouter initialEntries={["/movie/1/movieTimeSlots/1/venue/1/seatSelection"]}>
    <Routes>
      <Route
        path="/movie/:id/movieTimeSlots/:movieTimeSlotID/venue/:venueID/seatSelection"
        element={<Story />}
      />
    </Routes>
  </MemoryRouter>
);

export default withReactRouter;