import { Button, Container, Row } from "react-bootstrap"
function Welcome() {
    return (
        <div className="welcome">
            <div>
                <div className='text-center'>
                    <br />
                    <Button size="lg" className="m-5" variant="btn btn-outline-dark" href="/signup">Signup</Button>
                    <Button size="lg" className="m-5" variant="btn btn-outline-dark" href="/login">Login</Button>
                </div>
            </div>
        </div>
    )

}

export default Welcome