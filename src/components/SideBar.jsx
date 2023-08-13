import { Col } from "react-bootstrap";
import IconButton from "./IconButton";
import { useState } from "react";

export default function ProfileSideBar() {

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);


    return (
        <>

            {isSidebarVisible && (
                <Col
                    sm={2}
                    className="d-flex flex-column justify-content-start align-items-start bg-light vh-100"
                    style={{ position: 'sticky', top: 0 }}
                >
                    <br />
                    <IconButton className="bi bi-house" href="/home" text="Home" />
                    <IconButton className="bi bi-search" href="/search " text="Explore" />
                    <IconButton className="bi bi-journal-text" href="/reviews" text="Reviews" />
                    <IconButton className="bi bi-bookmark" href="/wishlist" text="Your Wishlist" />
                    <IconButton className="bi bi-person" href="/profile" text="Profile" />
                    <IconButton className="bi bi-filter-circle" text="More" />
                </Col>
            )}
        </>
    );
}