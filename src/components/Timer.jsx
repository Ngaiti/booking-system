import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

export default function Timer() {

    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);

    const startTimer = () => {
        if (timerInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
            setTimerInterval(intervalID);
        }
    };

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setTimer(0);
    };

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval]);

    return (
        <>

            <ButtonGroup>
                <Button variant="secondary">Timer: {timer} seconds</Button>
                <Button variant="secondary" onClick={startTimer}>
                    <i className="bi bi-play-circle"></i>
                </Button>
                <Button variant="secondary" onClick={pauseTimer} >
                    <i className="bi bi-pause-fill"></i>
                </Button>
                <Button variant="secondary" onClick={resetTimer} >
                    <i className="bi bi-arrow-clockwise"></i>
                </Button>
            </ButtonGroup >
        </>
    )
}

