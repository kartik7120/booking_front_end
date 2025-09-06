import './App.css'
import { Route, Routes } from 'react-router'
import Index from "./components/MovieTimeSlots/Index"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MovieDetails from './MovieDetails/MovieDetails'
import HomePage from './components/HomePage/HomePage'
import MovieReviewsIndex from "./components/MovieReviews/Index"
import Navbar from './components/FrontPage/Navbar'
import { useState } from 'react'
import SeatSelection from './components/SeatDetails/SeatSelection'
import SeatSelectionIndex from "./components/SeatSelection/SeatSelectionIndex"

const queryClient = new QueryClient()

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navbar isLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
          <Route index element={<HomePage />} />
          <Route path='movie/:id' element={<MovieDetails />} />
          <Route path="movie/:id/movieTimeSlots" element={<Index />} />
          <Route path="movie/:id/reviews" element={<MovieReviewsIndex />} />
          <Route path="movie/:id/venue/:venueID/movieTimeSlots/:movieTimeSlotID/seatSelection" element={<SeatSelectionIndex />} />
          <Route path="/confirmOrder" element={
            <div>
              Confirm order screen will be used to fetch data from zustand store and show user order summary and ask user to enter email id and phone number
            </div>
          } />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
