import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap"
import ProfileSideBar from "../components/SideBar";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Welcome() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                navigate('/login');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);



    return (
        <>
            <Container>
                <ProfileSideBar />
                <Home />
            </Container>
        </>
    );

}

export default Welcome