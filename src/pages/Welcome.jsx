import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import Weather from "../components/Weather";

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
        <div className="welcome">
            <div>
                <div className='text-center'>
                    <h1 className="h1-custom"> Hello there! It is now {currentTime.toString()}</h1>
                    <Weather />

                    <br />
                    <Button size="lg" className="m-5" variant="btn btn-outline-dark" href="/login">Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Welcome