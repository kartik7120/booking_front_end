import './App.css'
import { Route, Routes } from 'react-router'

function App() {
  return (
    <Routes>
      <Route index element={<div>This is the index page</div>} />
    </Routes>
  )
}

export default App
