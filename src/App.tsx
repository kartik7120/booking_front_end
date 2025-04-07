import './App.css'
import { Route, Routes } from 'react-router'
import Index from "./components/Index"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<Index />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
