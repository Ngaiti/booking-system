import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null)

    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password);
            navigate('/home')
        } catch (error) {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                setLoginError("Incorrect email or password. Please try again.");
            } else {
                setLoginError("An error occurred. Please try again later.");
            }
            console.error(error);
        }
    };


    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <Container>
                <Row className="justify-content-center ">
                    <Col xs={12} md={7} lg={5} className="text-center border border-5 border-dark rounded p-4 shadow ">
                        <h1 className="my-3"> Login to your account</h1>
                        <Form>
                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
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
                            <Button className="m-4" variant="outline-dark" onClick={handleLogin}>Login</Button>
                            <Button className="my-3" variant="outline-danger" href="/signup"> Signup</Button>

                        </Form>
                        {loginError && <p>{loginError}</p>}
                    </Col>
                </Row>
            </Container>
        </div>
    )

}