import './App.css'
import { Route, Routes } from 'react-router'
import Index from "./components/MovieTimeSlots/Index"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MovieDetails from './MovieDetails/MovieDetails'
import HomePage from './components/HomePage/HomePage'
import Navbar from './components/FrontPage/Navbar'
import { useState } from 'react'
import SeatSelectionIndex from "./components/SeatSelection/SeatSelectionIndex"
import ConfirmOrderContactDetails from './components/ConfirmOrder/ConfirmOrderContactDetails'
import PollingPageIndex from './components/PollingPage/PollingPageIndex'
import TicketPageIndex from './components/TicketPage/TicketPageIndex'
import AddReviewIndex from './components/AddReview/AddReviewIndex'
import AllReviewsIndex from './components/AllReviews/AllReviewsIndex'

const queryClient = new QueryClient()
export const baseURL = import.meta.env.VITE_BROKER_URL;

console.log(`vite broker url = ${baseURL}`)

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navbar isLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
          <Route index element={<HomePage />} />
          <Route path='movie/:id' element={<MovieDetails />} />
          <Route path="movie/:id/movieTimeSlots" element={<Index />} />
          <Route path="movie/:id/reviews" element={<AllReviewsIndex />} />
          <Route path="movie/:id/venue/:venueID/movieTimeSlots/:movieTimeSlotID/seatSelection" element={<SeatSelectionIndex />} />
          <Route path="/confirmOrder/:orderID" element={
            <ConfirmOrderContactDetails />
          } />
          <Route path="/confirmingBooking" element={<PollingPageIndex />} />
          <Route path="/ticket/:ticketID" element={<TicketPageIndex />} />
          <Route path="movie/:id/add-review" element={<AddReviewIndex />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
