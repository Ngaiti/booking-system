import './ColorModeToggler'; // Import the color mode toggler script
import { Container } from 'react-bootstrap';

export default function DarkMode() {

    return (
        <Container>
            {/* Add the color mode toggler button */}
            <button id="bd-theme" className="btn btn-primary btn-sm">
                Toggle Color Mode
            </button>
        </Container>
    );
}