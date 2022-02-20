import { Link } from 'react-router-dom'
import './App.css'
import background from './images/home_background.png'
import Button from '@mui/material/Button';
import Band from './Band';

function App() {
  return (
    <div style={{ height:"100vh", backgroundImage: `url(${background})`,  backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundColor: 'black', backgroundPosition: 'center'}}>
      {"welcome"}
      <nav>
        <Button  variant="outlined" size = 'large' component={Link} to="/jam" style={{maxWidth: '150px', maxHeight: '150px', minWidth: '150px', minHeight: '150px'}}>Jam</Button>

      </nav>
      <nav>
        <Button variant="outlined" size = 'large' component={Link} to="/band">Band</Button>
      </nav>
    </div>
  )
}

export default App
