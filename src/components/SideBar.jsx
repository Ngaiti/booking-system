import { Button, Col, Modal } from "react-bootstrap";
import IconButton from "./IconButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProfileSideBar() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleLogoutConfirmation = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    const handleLogoutConfirmed = () => {
        setShowLogoutModal(false);
        handleLogout();
    };

    return (
        <>

            {isSidebarVisible && (
                <Col
                    sm={2}
                    className="d-flex flex-column justify-content-start align-items-start bg-dark vh-100"
                    style={{ position: 'sticky', top: 0 }}
                >
                    <br />
                    <IconButton className="bi bi-house" href="/home" text="Home" />
                    <IconButton className="bi bi-search" href="/search " text="Explore" />
                    <IconButton className="bi bi-journal-text" href="/reviews" text="Reviews" />
                    <IconButton className="bi bi-bookmark" href="/wishlist" text="Your Wishlist" />
                    <IconButton className="bi bi-person" href="/profile" text="Profile" />
                    <IconButton className="bi bi-filter-circle" text="More" />
                    <IconButton className="bi bi-door-closed" onClick={handleLogoutConfirmation} text="Logout" />

                </Col>


            )}
            <Modal show={showLogoutModal} onHide={handleLogoutCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Footer>

                    <Button variant="btn btn-outline-secondary" onClick={handleLogoutCancel}>
                        Cancel
                    </Button>
                    <Button variant="btn btn-outline-danger" onClick={handleLogoutConfirmed}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}