import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import background from '../images/jam_menu_background.png'

function JamMenu() {
    return (
        <div style={{ padding: '30px', backgroundImage: `url(${background})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundColor: "black", backgroundSize: 'cover',  backgroundPosition: 'center', textAlign: 'center'}}>
            <h1 style={{fontFamily: 'Rocko', color: '#BE4FF3', fontSize: '80px'}}>Welcome to Jam</h1>
            <h2 style={{fontFamily: 'Rocko', color: '#00FFFF', fontSize: '40px'}}>Build a song through American Sign Language</h2>
            <nav style={{marginBottom: '-50px'}}>
                <Button variant="outlined" size = 'large' style={{maxWidth: '200px', maxHeight: '50px', minWidth: '150px', minHeight: '150px', margin: '50px', fontFamily: 'GuitarHero', color: '#1CE16C', fontSize: '30px'}}>Select Intstrument</Button>
            </nav>
            <nav style={{marginBottom: '-50px'}}>
                <Button variant="outlined" size = 'large' style={{maxWidth: '200px', maxHeight: '50px', minWidth: '150px', minHeight: '150px', margin: '50px', fontFamily: 'GuitarHero', color: '#1CE16C', fontSize: '30px'}}>Select ASL Signs</Button>
            </nav>
            <nav style={{marginBottom: '-50px'}}>
                <Button variant="outlined" size = 'large' component={Link} to="/jam" style={{maxWidth: '150px', maxHeight: '150px', minWidth: '150px', minHeight: '150px', margin: '50px', fontFamily: 'GuitarHero', color: '#00FFFF', fontSize: '40px'}}>Jam</Button>
            </nav>
        </div>
    );
  }
  
  export default JamMenu