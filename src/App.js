import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <nav>
        <Link to='/band'>Band</Link>
      </nav>
      <nav>
        <Link to='/jam'>Jam</Link>
      </nav>
    </div>
  )
}

export default App
