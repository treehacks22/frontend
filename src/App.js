import { Link } from 'react-router-dom'
import './App.css'
<<<<<<< Updated upstream

function App() {
  return (
    <div>
      <nav>
        <Link to='/band'>Band</Link>
=======
import background from './images/home_background.png'
import Button from '@mui/material/Button'

function App() {
  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: 'black',
        backgroundPosition: 'center'
      }}
    >
      {'welcome'}
      <nav>
        <Button
          size='large'
          component={Link}
          to='/jammenu'
          style={{
            maxWidth: '150px',
            maxHeight: '150px',
            minWidth: '150px',
            minHeight: '150px',
            margin: '50px',
            fontFamily: 'GuitarHero',
            color: '#00FFFF',
            fontSize: '40px'
          }}
        >
          Jam
        </Button>
      </nav>
      <nav>
        <Button
          size='large'
          component={Link}
          to='/band'
          style={{
            maxWidth: '150px',
            maxHeight: '150px',
            minWidth: '150px',
            minHeight: '150px',
            margin: '50px',
            float: 'right',
            fontFamily: 'GuitarHero',
            color: '#00FFFF',
            fontSize: '40px'
          }}
        >
          Band
        </Button>
>>>>>>> Stashed changes
      </nav>
    </div>
  )
}

export default App
