import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);

    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    function login() {
        const isCorrectUsername = username === "ngaiti@gmail.com"
        const isCorrectPassword = password === "password"
        if (isCorrectUsername && isCorrectPassword) {
            authContext.setToken("4434");
            navigate("/Home")
        } else {
            setLoginFailed(true)
        }
    }

    return (
        <Container>
            <h1 className="my-3"> Login to your account</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                <Button className="my-3" variant="outline-dark" onClick={login}>Login</Button>
            </Form>
            {loginFailed && <p>Invalid email or password. Please try again.</p>}
        </Container>
    )

}