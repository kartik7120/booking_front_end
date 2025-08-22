import './App.css'
import { Route, Routes } from 'react-router'
import MovieTimeSlotsIndex from "./components/Index"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MovieDetails from './MovieDetails/MovieDetails'
import HomePage from './components/HomePage/HomePage'
import MovieReviewsIndex from "./components/MovieReviews/Index"
import Navbar from './components/FrontPage/Navbar'
import { useState } from 'react'

const queryClient = new QueryClient()

function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Navbar isLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
          <Route index element={<HomePage />} />
          <Route path='movie/:id' element={<MovieDetails />} />
          <Route path="movie/:id/movieTimeSlots" element={<MovieTimeSlotsIndex />} />
          <Route path="movie/:id/reviews" element={<MovieReviewsIndex />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
