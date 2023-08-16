import { Button, Col, Container, Row } from "react-bootstrap";

function Welcome() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <Container>
                <Row className="justify-content-center ">
                    <Col xs={12} md={7} lg={5} className="text-center border border-5 border-dark rounded p-4 shadow ">
                        <h4>Welcome to</h4>
                        <h1 className="color info">Stratus</h1>
                        <h4 className="my-3">Let&apos;s get started!</h4>

                        <Button size="lg" className="m-5" variant="outline-dark" href="/signup">
                            Signup
                        </Button>
                        <Button size="lg" className="m-5" variant="outline-dark" href="/login">
                            Login
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Welcome;