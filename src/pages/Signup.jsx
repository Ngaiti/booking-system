import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [signupError, setSignupError] = useState(null);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            const response = await fetch('https://capstone-project.ngaiti.repl.co/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: auth.currentUser.uid, username, user_email: email })
            });

            if (response.ok) {
                navigate('/home');
            } else {
                setSignupError("Error creating account. Please try again.");
            }
        } catch (error) {
            setSignupError("Error creating account. Please try again.");
            console.error(error);
        }
    };



    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <Container>
                <Row className="justify-content-center ">
                    <Col xs={12} md={7} lg={5} className="text-center border border-5 border-dark rounded p-4 shadow ">
                        <h1 className="my-3">Sign up for an account</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="my-3" variant="outline-dark" onClick={handleSignup}>
                                Sign Up
                            </Button>
                        </Form>
                        {signupError && <p>{signupError}</p>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}