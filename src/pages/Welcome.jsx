import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import CurrentMovies from "../components/CurrentMovies";

function Welcome() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <div className='text-center'>
                <br />
                <h2 className="h2-custom"> {currentTime.toString()}</h2>
                <Button size="lg" className="m-5" variant="btn btn-outline-dark" href="/signup">Signup</Button>
                <Button size="lg" className="m-5" variant="btn btn-outline-dark" href="/login">Login</Button>
                <br />
                <CurrentMovies />
                <br />
            </div>
        </div>
    )
}

export default Welcome