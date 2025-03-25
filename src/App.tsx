import './App.css'
import { Route, Routes } from 'react-router'
import Index from "./components/Index"

function App() {
  return (
    <Routes>
      <Route index element={<Index />} />
    </Routes>
  )
}

export default App
