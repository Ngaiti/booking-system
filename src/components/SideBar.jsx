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
                    <IconButton className="bi bi-house" href="/" text="Home" />
                    <IconButton className="bi bi-search" href="/explore " text="Explore" />
                    <IconButton className="bi bi-journal-text" text="Lists" />
                    <IconButton className="bi bi-bookmark" text="Bookmarks" />
                    <IconButton className="bi bi-patch-check" text="Verified" />
                    <IconButton className="bi bi-person" href="/profile" text="Profile" />
                    <IconButton className="bi bi-filter-circle" text="More" />
                </Col>
            )}
        </>
    );
}