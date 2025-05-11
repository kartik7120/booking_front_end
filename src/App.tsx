import './App.css'
import { Route, Routes } from 'react-router'
import MovieTimeSlotsIndex from "./components/Index"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MovieDetails from './MovieDetails/MovieDetails'
import HomePage from './components/HomePage/HomePage'
import MovieReviewsIndex from "./components/MovieReviews/Index"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='movie/:id' element={<MovieDetails />} />
        <Route path="movie/:id/movieTimeSlots" element={<MovieTimeSlotsIndex />} />
        <Route path="movie/:id/reviews" element={<MovieReviewsIndex />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
