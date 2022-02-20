import { Link } from 'react-router-dom'
import './App.css'
import background from './images/home_background.png'
import Button from '@mui/material/Button';

function App() {
  return (
    <div style={{ height:"100vh", backgroundImage: `url(${background})`,  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundColor: 'black', backgroundPosition: 'center'}}>
      {"welcome"}
      <nav>
        <Button size = 'large' component={Link} to="/jam" style={{maxWidth: '150px', maxHeight: '150px', minWidth: '150px', minHeight: '150px', margin: '50px', fontFamily: 'GuitarHero', color: '#00FFFF', fontSize: '40px'}}>Jam</Button>
      </nav>
      <nav>
        <Button size = 'large' component={Link} to="/band" style={{maxWidth: '150px', maxHeight: '150px', minWidth: '150px', minHeight: '150px', margin: '50px', float: 'right', fontFamily: 'GuitarHero', color: '#00FFFF', fontSize: '40px'}}>Band</Button>
      </nav>
    </div>
  )
}

export default App
