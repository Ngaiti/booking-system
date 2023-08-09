import { Col } from "react-bootstrap";
import IconButton from "./IconButton";
import { useState } from "react";

export default function ProfileSideBar() {

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <IconButton
                className="bi bi-playstation"
                onClick={toggleSidebar}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1,
                }}
            />

            {isSidebarVisible && (
                <Col
                    sm={2}
                    className="d-flex flex-column justify-content-start align-items-start bg-light vh-100"
                    style={{ position: 'sticky', top: 0 }}
                >
                    {/* Sidebar content */}
                </Col>
            )}
        </>
    );
}